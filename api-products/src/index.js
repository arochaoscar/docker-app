const { v4: uuidv4 } = require('uuid')
const express = require('express')
const bodyParser = require('body-parser')
const { API_KEY } = require('./config/environment')
const { logRequest } = require('./libs/loggers')
const productsCtr = require('./controllers/products')

const app = express()
const port = 4000
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
    req.id = uuidv4();
    logRequest(req)
    next()
})

app.param('id',  (req, res, next, id) =>{
    (parseInt(id) > 0)?next(): res.status(400).json({msg : 'Invalid Request'})
})

app.get('/', async(req,res) =>{

    try {
        res.status(200).json({
            appStatus: "Api Products Running"
        })

    } catch (error) {
        res.status(503).send(error) 
    }

})

app.get('/products', async(req,res) =>{
    try {

        const products = await productsCtr.getProducts() 

        res.status(200).json(products)

    } catch (error) {
        res.status(503).send(error) 
    }

})

app.get('/products/:id', async(req,res) =>{
    try {

        const products = await productsCtr.getProduct(req.params.id) 

        if(products !== undefined)
            res.status(200).json(products)
        else
            res.status(404).json({msg: 'Product Not Found'}) 

        
    } catch (error) {
        res.status(500).send(error) 
    }

})

app.post('/products', async(req,res) =>{
    try {

        const product = await productsCtr.createProduct(req) 

        res.status(200).json(product)

    } catch (error) {
        res.status(503).send(error) 
    }
})

app.put('/products/:id', async(req,res) =>{
    try {
        const products = await productsCtr.updateProduct(req.params.id,req) 
        
        if(products !== undefined)
            res.status(200).json(products)
        else
            res.status(404).json({msg: 'Product Not Found'}) 

        
    } catch (error) {
        res.status(500).send(error) 
    }

})


app.put('/products/stock/:id', async(req,res) =>{
    try {

        const products = await productsCtr.updateStock(req.params.id,req) 

        if(products !== undefined)
            res.status(200).json(products)
        else
            res.status(404).json({msg: 'Product Not Found'}) 

        
    } catch (error) {
        res.status(500).send(error) 
    }

})

app.put('/products/price/:id', async(req,res) =>{
    try {

        const products = await productsCtr.updatePrice(req.params.id,req) 

        if(products !== undefined)
            res.status(200).json(products)
        else
            res.status(404).json({msg: 'Product Not Found'}) 

        
    } catch (error) {
        res.status(500).send(error) 
    }

})


app.listen(port, async() => {
    console.log(`Products Api listening by port ${port} and key ${API_KEY}`)
})
