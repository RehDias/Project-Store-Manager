const connect = require('./connection');

const salesModel = {
  async add(body) {
    const sqlQuery = 'INSERT INTO StoreManager.sales (product_id, quantity) VALUES (?, ?);';
    const [{ insertId }] = await connect.query(sqlQuery, [body.productId, body.quantity]);
    return insertId;
  },
};

module.exports = salesModel;