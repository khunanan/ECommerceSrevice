const db = require('./db');
const helper = require('../config/helper');
const config = require('../config/config');

async function getProductListbyCondition(page = 1, listPerPage = 10, gender = "%", category = "%", size = "%") {
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

async function getOrdersbyStatus(page = 1, listPerPage = 10, status = "%") {
  const offset = helper.getOffset(page, listPerPage);
  const cmd = `SELECT orders.id, orders.datetime, orders.address, orders.status, order_item.count, product.name, product.category, product.price, product.gender, product.size , (product.price * order_item.count) AS total
    FROM orders LEFT JOIN order_item ON (order_item.orderid = orders.id) LEFT JOIN product on product.id = order_item.productid
    WHERE orders.status LIKE "${status}" LIMIT ${offset},${listPerPage}`;
  const rows = await db.query(
    cmd
  );
  const data = helper.emptyOrRows(rows);

  const groupData = data.prototype.groupBy(({id})=>id)
  const meta = { page };

  return {
    groupData,
    meta
  }
}

async function getMenuBycategoryName(page = 1, listPerPage = 10, categoryName = "a") {
  const offset = helper.getOffset(page, listPerPage);
  const rows = await db.query(
    `SELECT * FROM menu WHERE categories='${categoryName}' LIMIT ${offset},${listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta
  }
}

async function getMenuByPrice(page = 1, listPerPage = 10, startPrice = 0, endPrice = 10000) {
  const offset = helper.getOffset(page, listPerPage);
  const rows = await db.query(
    `SELECT * FROM menu WHERE price >= ${startPrice} AND price <= ${endPrice} LIMIT ${offset},${listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta
  }
}

async function getMenuByCountAtleast(page = 1, listPerPage = 10, count = 0) {
  const offset = helper.getOffset(page, listPerPage);
  const rows = await db.query(
    `SELECT * FROM menu WHERE count >= ${count} LIMIT ${offset},${listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta
  }
}

async function getMenuByCountLessThan(page = 1, listPerPage = 10, count = 0) {
  const offset = helper.getOffset(page, listPerPage);
  const rows = await db.query(
    `SELECT * FROM menu WHERE count < ${count} LIMIT ${offset},${listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta
  }
}

module.exports = {
  getProductListbyCondition, getOrdersbyStatus, getMenuBycategoryName, getMenuByPrice, getMenuByCountAtleast, getMenuByCountLessThan

}
