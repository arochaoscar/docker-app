const { Pool } = require("pg");
const { DB_SERVER, DB_NAME, DB_USER, DB_PASS } = require('../config/environment');


const getConn = async () =>{

  return new Promise((resolve,reject) => {
    try {
      
      const conf = {
        user: DB_USER,
        host: DB_SERVER,
        database: DB_NAME,
        password: DB_PASS,
        port: 5432,
      };

      const pool = new Pool(conf);

      resolve(pool)
      
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
        if (error) throw error
        conn.end()
        resolve(results.rows);
      });
      
    } catch (error) {
      reject(error)
    }
  })
}



module.exports = {
  consult
};