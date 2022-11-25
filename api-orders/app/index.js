const { v4: uuidv4} = require('uuid')
const express = require('express')
const bodyParser = require('body-parser')

const {API_KEY } = require('./config/environment')
const { logRequest } = require('./libs/loggers')
const ordersCtr = require('./controllers/ordersController')

const app = express()
const port = 9000
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

app.get('/', async (req, res) => {

    try {

        res.status(200).json({
            appStatus: "Api Orders Running"
        })

    } catch (error) {

        res.status(503).send(error)

    }

})

app.get('/orders', async (req, res) => {

    try {

        const orders = await ordersCtr.getOrders(req)
        res.status(200).json(orders)

    } catch (error) {
        res.status(503).send(error)
    }

})

app.get('/orders/:id', async (req, res) => {

    try {

        const orders = await ordersCtr.getOrder(req.params.id)
        res.status(200).json(orders)

    } catch (error) {

        res.status(503).send(error)

    }

})

app.post('/orders', async (req, res) => {

    try {

        const orders = await ordersCtr.createOrder(req)
        res.status(200).json(orders)

    } catch (error) {

        res.status(503).send(error)

    }

})


app.put('/orders/state/:id', async (req, res) => {

    try {

        const orders = await ordersCtr.updateState(req.params.id,req)
        res.status(200).json(orders)

    } catch (error) {

        res.status(503).send(error)

    }

})

app.listen(port, async () => {

    console.log(`Orders Api listening by port ${port} and key ${API_KEY}`)

})