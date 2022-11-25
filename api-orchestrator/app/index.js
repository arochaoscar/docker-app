const { v4: uuidv4 } = require('uuid')
const express = require('express')
const bodyParser = require('body-parser')
const { API_KEY } = require('./config/environment')
const { logRequest } = require('./libs/loggers')
const productsApi = require('./apis/productsAPI')
const ordersApi = require('./apis/ordersAPI')


const app = express()
const port = 3000
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())

// enable CORS for all routes and for our specific API-Key header
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-api-key')
    next()
})

app.use((req, res, next) => {
    const apiKey = req.get('x-api-key')
    if (!apiKey || apiKey !== API_KEY) {
        res.status(401).json({
            error: 'unauthorised'
        })
    } else {
        next()
    }
})

app.use((req, res, next) => {
    req.id = uuidv4()
    logRequest(req)
    next()
})

app.param('id', (req, res, next, id) => {

    (parseInt(id) > 0) ? next(): res.status(400).json({
        msg: 'Invalid Request'
    })

})

app.get('/', async(req,res) =>{

    try {
        res.status(200).json({
            appStatus: "Running"
        })

    } catch (error) {
        res.status(503).send(error) 
    }

})

app.get('/orders', async(req,res) =>{
    try {

        const orders = await ordersApi.getOrders(req)

        res.status(200).json(orders)

    } catch (error) {
        res.status(503).send(error) 
    }

})

app.post('/orders', async(req,res) =>{
    try {

        const products = req.body.products

        const invalidProducts = []
        const validProducts = []


        for (const product of products){

            const checkProduct = await productsApi.getProduct(req,product.id);

            if(Number(checkProduct.stock) > Number(product.quantity)){
                validProducts.push({
                    id:product.id,
                    stock: Number(checkProduct.stock) - Number(product.quantity)
                })

            }else{
                invalidProducts.push({
                    id:product.id,
                    msg: 'Product stockOut'
                })
            }            
        }

        if(invalidProducts.length > 0){
            res.status(400).json(invalidProducts)
        }else{
            const order = await ordersApi.createOrder(req)

            for (const product of validProducts){
                await productsApi.updateStock(req,product.id,product.stock);
            }

            res.status(200).json(order)
        }

    } catch (error) {
        res.status(503).send(error) 
    }

})


app.get('/products', async(req,res) =>{
    try {
        const products = await productsApi.getProducts(req)
        res.status(200).json(products)
    } catch (error) {
        res.status(503).send(error) 
    }

})

app.listen(port, async() => {
    console.log(`Orchestrator Api listening by port ${port} and Key: ${API_KEY}`)
})