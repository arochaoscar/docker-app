const axios = require('../libs/axios')

const getOrders = async(req) => {
    try {
        const conf = {
            method: 'get',
            url: 'http://orders:9000/orders',
            headers: { 
              'x-api-key': 'SE9ZRVMyMDIyMTEyMkhPUkEyMUNPTjU3TUlO'
            }
        }
        const orders = await axios.request(conf,req.id)
        return orders
    } catch (error) {
        throw error
    }
}

const createOrder = async(req) => {
    try {
        const conf = {
            method: 'post',
            url: 'http://orders:9000/orders',
            headers: { 
              'x-api-key': 'SE9ZRVMyMDIyMTEyMkhPUkEyMUNPTjU3TUlO'
            },
            data: req.body
        }
        const orders = await axios.request(conf,req.id)
        return orders
    } catch (error) {
        throw error
    }
}

module.exports = {
    getOrders,
    createOrder
}