const orders = require('../models/orders');

const getOrders = async () => {
    try {
        const result = await orders.findAll()
        return result
   } catch (error) {
       console.log(error)
       throw error
   }
}

const getOrder = async (id) => {
    try {
        const result = await orders.find(id)
        
        return (result.length > 0)?result[0]:undefined

   } catch (error) {
       console.log(error)
       throw error
   }
}


const createOrder = async (req) => {
    try {

        const order = await orders.create(req.body)
        
        return order

    } catch (error) {
        console.log(error)
        throw error
    }
}


const updateState = async (id, req) => {
    try {

        const order = await orders.updateState(id,req.body)

        return order

    } catch (error) {
        console.log(error)
        throw error
    }
}

module.exports = {
    getOrder,
    getOrders,
    createOrder,
    updateState
};
