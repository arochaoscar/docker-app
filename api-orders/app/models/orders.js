const db = require('../libs/database')

const find = async (id) => {
    const query = `SELECT * FROM orders WHERE id = ${id}`

    try {
        const orders = await db.consult(query)
        return orders;
    } catch (error) {
        return error
    }
}

const findAll = async () => {

    const query = `SELECT * FROM orders`

    try {
        const orders = await db.consult(query)

        return orders;
    } catch (error) {
        return error
    }
}


const create = async (order) => {
    const query = `INSERT INTO orders (state, products, created_at, updated_at) VALUES 
    ('pending','${JSON.stringify(order.products)}',now(),now()) RETURNING id`

    try {

        const id = await db.consult(query)

        const newOrder = await find(id[0].id)
        
        return newOrder[0];

    } catch (error) {
        return error
    }
}

const updateState = async (id, order) => {
    const query = `UPDATE orders SET state = '${order.state}', updated_at = now() WHERE id = ${id};`

    try {

        await db.consult(query)
        const orderOld = await find(id)
        return orderOld[0]
        
    } catch (error) {
        return error
    }
}


module.exports = {

    findAll,
    find,
    create,
    updateState
}