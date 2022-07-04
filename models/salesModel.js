const connect = require('./connection');

const salesModel = {
  async addIntoSales() {
    const sqlQuery = 'INSERT INTO StoreManager.sales () VALUES ();';
    const [{ insertId }] = await connect.query(sqlQuery);
    return insertId;
  },

  async addIntoSalesProducts(body, id) {
    const sqlQuery = `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
    VALUES (?, ?, ?), (?, ?, ?);`;
    await connect.query(sqlQuery,
      [id, body[0].productId, body[0].quantity, id, body[1].productId, body[1].quantity]);
  },

  async getProductsSold(id) {
    const sqlQuery = `SELECT product_id AS productId, quantity FROM StoreManager.sales_products
    WHERE sale_id = ?;`;
    const [items] = await connect.query(sqlQuery, [id]);
    return items;
  },

  async productIdExists(body) {
    const sqlQuery = 'SELECT 1 FROM StoreManager.sales_products WHERE product_id = ?;';
    const [[product]] = await connect.query(sqlQuery, [body]);
    return !!product;
  },

  async listaAll() {
    const sqlQuery = `SELECT sp.sale_id AS saleId, s.date, sp.product_id AS productId, sp.quantity
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS s ON s.id = sp.sale_id
    ORDER BY saleId, productId;`;
    const [sales] = await connect.query(sqlQuery);
    return sales;
  },

  async getSalesById(id) {
    const sqlQuery = `SELECT s.date, sp.product_id AS productId, sp.quantity
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS s ON s.id = sp.sale_id
    WHERE s.id = ?;`;
    const [sales] = await connect.query(sqlQuery, [id]);
    return sales;
  },

  async salesExists(id) {
    const sqlQuery = 'SELECT 1 FROM StoreManager.sales_products WHERE sale_id = ?;';
    const [[sale]] = await connect.query(sqlQuery, [id]);
    return !!sale;
  },
};

module.exports = salesModel;