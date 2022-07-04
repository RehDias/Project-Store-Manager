const connect = require('./connection');

const productsModel = {
  async listAll() {
    const sqlQuery = 'SELECT * FROM StoreManager.products ORDER BY id;';
    const [products] = await connect.query(sqlQuery);
    return products;
  },

  async get(id) {
    const sqlQuery = 'SELECT * FROM StoreManager.products WHERE id = ?;';
    const [[product]] = await connect.query(sqlQuery, [id]);
    return product;
  },

  async exists(id) {
    const sqlQuery = 'SELECT 1 FROM StoreManager.products WHERE id = ?;';
    const [[product]] = await connect.query(sqlQuery, [id]);
    return !!product;
  },

  async add(body) {
    const sqlQuery = 'INSERT INTO StoreManager.products (name) VALUES (?)';
    const [{ insertId }] = await connect.query(sqlQuery, [body.name]);
    return insertId;
  },

  async edit(id, body) {
    const sqlQuery = 'UPDATE StoreManager.products SET ? WHERE id = ?;';
    await connect.query(sqlQuery, [body, id]);
  },

  async remove(id) {
    const sqlQuery = 'DELETE FROM StoreManager.products WHERE id = ?;';
    await connect.query(sqlQuery, [id]);
  },
};

module.exports = productsModel;