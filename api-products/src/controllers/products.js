const products = require('../models/products');

const getProducts = async () => {
    try {
        const result = products.findAll()
        return result
   } catch (error) {
       console.log(error)
       throw error
   }
}

const getProduct = async (id) => {
    try {
        const result = await products.find(id)
        
        return (result.length > 0)?result[0]:undefined

   } catch (error) {
       console.log(error)
       throw error
   }
}


const createProduct = async (req) => {
    try {

        const product = await products.create(req.body)

        return product

    } catch (error) {
        console.log(error)
        throw error
    }
}


const updateProduct = async (id, req) => {
    try {

        const product = await products.update(id,req.body)

        return product

    } catch (error) {
        console.log(error)
        throw error
    }
}


const updatePrice = async (id, req) => {
    try {

        const product = await products.updatePrice(id,req.body)

        return product

    } catch (error) {
        console.log(error)
        throw error
    }
}

const updateStock = async (id, req) => {
    try {

        const product = await products.updateStock(id,req.body)

        return product

    } catch (error) {
        console.log(error)
        throw error
    }
}

module.exports = {
    getProduct,
    getProducts,
    createProduct,
    updateProduct,
    updateStock,
    updatePrice
};
