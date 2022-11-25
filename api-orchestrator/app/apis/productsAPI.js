const axios = require('../libs/axios')

const getProducts = async(req) => {
    try {
        const conf = {
            method: 'get',
            url: 'http://products:4000/products',
            headers: { 
              'x-api-key': 'SE9ZRVMyMDIyMTEyMkhPUkEyMUNPTjU3TUlO'
            }
        }
    
        const products = await axios.request(conf,req.id)
    
        return products
            
    } catch (error) {

        return error
    }
}

const getProduct = async(req,id) => {
    try {
        const conf = {
            method: 'get',
            url: `http://products:4000/products/${id}`,
            headers: { 
              'x-api-key': 'SE9ZRVMyMDIyMTEyMkhPUkEyMUNPTjU3TUlO'
            }
        }
    
        const products = await axios.request(conf,req.id)
    
        return products
            
    } catch (error) {

        return error
    }
}


const updateStock = async(req,id,stock) => {
    try {
        const conf = {
            method: 'put',
            url: `http://products:4000/products/stock/${id}`,
            headers: { 
              'x-api-key': 'SE9ZRVMyMDIyMTEyMkhPUkEyMUNPTjU3TUlO'
            },
            data: {
                stock
            }
        }
    
        const products = await axios.request(conf,req.id)
    
        return products
            
    } catch (error) {

        return error
    }
}

module.exports = {
    getProducts,
    getProduct,
    updateStock
}