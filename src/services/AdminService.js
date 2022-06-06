const db = require('./db');
const helper = require('../config/helper');
const config = require('../config/config');

async function getOrdersByStatus(page = 1, listPerPage = 10, status = "%") {
  const offset = helper.getOffset(page, listPerPage);
  const cmd = `SELECT orders.id, orders.datetime, orders.address, orders.status, order_item.id AS itemId,order_item.count, product.name, product.category, product.price, product.gender, product.size , (product.price * order_item.count) AS total
    FROM orders LEFT JOIN order_item ON (order_item.orderid = orders.id) LEFT JOIN product on product.id = order_item.productid
    WHERE orders.status LIKE "${status}" LIMIT ${offset},${listPerPage}`;

  const rows = await db.query(cmd);
  const firstData = helper.emptyOrRows(rows);

  const myObject = firstData.reduce((newGroupData, item) => {
    const { id } = item;
    newGroupData[id] = newGroupData[id] ?? [];
    newGroupData[id].push(item);
    return newGroupData;
  }, {});

  const data = []
  Object.keys(myObject).map(function(key, index) {
    const  obj = myObject[key][0];
    const reGroup = myObject[key].map((item) => {
      return {itemId: item.itemId,
        count: item.count,
        name: item.name,
        category: item.category,
        price: item.price,
        gender: item.gender,
        size: item.size,
        total: item.total
      }
    })
    const bbb = {
      "orderId": obj["id"],
      "datetime": obj["datetime"],
      "address": obj["address"],
      "status": obj["status"],
      item: reGroup
    }
    data.push(bbb)
  });
  console.log(data);
  const meta = { page };

  return {
    data,
    meta
  }
}

module.exports = { getOrdersByStatus }