const connect = require('./connection');

const productsModel = {
  async listAll() {
    const sqlQuery = `SELECT * FROM StoreManager.products ORDER BY id;`;
    const [products] = await connect.query(sqlQuery);
    return products;
  },

  async get(id) {
    const sqlQuery = `SELECT * FROM StoreManager.products WHERE id = ?;`;
    const [[product]] = await connect.query(sqlQuery, [id]);
    return product;
  },

  async exists(id) {
    const sqlQuery = `SELECT name FROM StoreManager.products WHERE id = ?;`;
    const [[product]] = await connect.query(sqlQuery, [id]);
    return !!product;
  }
};

module.exports = productsModel;