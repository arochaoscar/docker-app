const db = require('../libs/database')

const find = async (id) => {
    const query = `SELECT * FROM products WHERE id = ${id}`

    try {
        const products = await db.consult(query)
        return products;
    } catch (error) {
        return error
    }
}

const findAll = async () => {

    const query = `SELECT * FROM products`

    try {
        const products = await db.consult(query)

        return products;
    } catch (error) {
        return error
    }
}


const create = async (product) => {
    const query = `INSERT INTO products (name,price,currency, stock) VALUES 
    ('${product.name}',${product.price},'${product.currency}',${product.stock});`

    try {

        //await db.consult(query)
        const id = await db.consult(query)

        return {
            id: id.insertId,
            ...product,
        };

    } catch (error) {
        return error
    }
}

const update = async (id,product) => {

    try {

        const productOld = await find(id)
        
        const query = `UPDATE products SET 
        name = '${product.name || productOld[0].name}',
        price = ${product.price || productOld[0].price},
        currency = '${product.currency || productOld[0].currency}', 
        stock = ${product.stock || productOld[0].stock} 
        WHERE id = ${id};`        
        
        const result = await db.consult(query)

        const newProduct = {
            id,
            name: product.name || productOld[0].name,
            price: product.price || productOld[0].price,
            currency: product.currency || productOld[0].currency,
            stock: product.stock || productOld[0].stock,
        }

        return newProduct

    } catch (error) {
        return error
    }
}


const updateStock = async (id, product) => {
    const query = `UPDATE products SET stock = ${product.stock} WHERE id = ${id};`

    try {

        const productOld = await find(id)

        oldStock = productOld[0].stock
        productOld[0].stock = product.stock

        const result = await db.consult(query)

        return {
            ...productOld[0],
            oldStock
        }

    } catch (error) {
        return error
    }
}

const updatePrice = async (id, product) => {
    const query = `UPDATE products SET price = ${product.price} WHERE id = ${id};`

    try {

        const productOld = await find(id)

        oldPrice = productOld[0].price
        productOld[0].stock = product.price

        const result = await db.consult(query)

        return {
            ...productOld[0],
            oldPrice
        }

    } catch (error) {
        return error
    }
}


module.exports = {

    findAll,
    find,
    create,
    updateStock,
    updatePrice,
    update
}