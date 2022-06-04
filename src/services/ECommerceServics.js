const db = require('./db');
const helper = require('../config/helper');
const config = require('../config/config');

async function getProductListByCondition(page = 1, listPerPage = 10, gender = "%", category = "%", size = "%") {
  const offset = helper.getOffset(page, listPerPage);
  const cmd = `SELECT * FROM product WHERE product.category LIKE "${category}" AND product.gender LIKE "${gender}" AND product.size LIKE "${size}" LIMIT ${offset},${listPerPage}`;
  console.log(cmd);
  const rows = await db.query(
    cmd
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta
  }
}

async function createOrder(address, status = "PAYMENT_PENDING") {

  const rows = await db.query(
    `INSERT INTO orders (id, address, status) VALUES (NULL, '${address}', '${status}')`
  );
  console.log(rows);
  const data = helper.emptyOrRows(rows);

  return {
    data
  }
}

module.exports = {
  getProductListByCondition, createOrder

}