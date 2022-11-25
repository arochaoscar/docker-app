const mysql = require('mysql');
const { DB_SERVER, DB_NAME, DB_USER, DB_PASS } = require('../config/environment');

const getConn = async () =>{
  return new Promise((resolve,reject) => {
    try {
      const pool  = mysql.createPool({
        connectionLimit : 10,
        host            : DB_SERVER,
        user            : DB_USER,
        password        : DB_PASS,
        database        : DB_NAME
      });
      pool.getConnection((error, conn) =>{
        if (error) throw error;
        resolve(conn)
      }) 
    } catch (error) {
      reject(error)
    }
  })
}

const consult = async (query) =>{
  return new Promise(async (resolve,reject) => {
    try {
      const conn = await getConn()
      conn.query(query, (error, results, fields) => {
        if (error) throw error;
        resolve(results);
      });
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  consult
};