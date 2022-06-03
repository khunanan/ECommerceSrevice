const db = require('./db');
const helper = require('../config/helper');
const config = require('../config/config');

async function getAllUser(page = 1, listPerPage = 10) {
  const offset = helper.getOffset(page, listPerPage);
  const rows = await db.query(
    `SELECT id,username,fristname,lastname,birthdate,email,phone FROM user LIMIT ${offset},${listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta
  }
}

async function getUserByUsername(page = 1, listPerPage = 10, name = "a") {
  const offset = helper.getOffset(page, listPerPage);
  const rows = await db.query(
    `SELECT id,username,fristname,lastname,birthdate,email,phone FROM user WHERE username = '${name}' LIMIT ${offset},${listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta
  }
}

async function getUserByName(page = 1,listPerPage = 10, name = "a") {
  const offset = helper.getOffset(page, listPerPage);
  const rows = await db.query(
    `SELECT id,username,fristname,lastname,birthdate,email,phone FROM user WHERE fristname LIKE '%${name}%' OR lastname LIKE '%${name}%' LIMIT ${offset},${listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta
  }
}

async function login(userName = "a") {

  const rows = await db.query(
    `SELECT id,username,password,fristname,lastname,birthdate,email,phone FROM user WHERE username = '${userName}'`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta
  }
}

async function createOrder(username, password, fristname, lastname, phone, email, birthdate) {
  const rows = await db.query(
    `INSERT INTO user (id, username, password, fristname, lastname, phone, email, birthdate) VALUES (NULL, '${username}', '${password}', '${fristname}', '${lastname}', '${phone}', '${email}', '${birthdate}')`);
  console.log(rows);
  const data = helper.emptyOrRows(rows);

  return {
    data
  }
}


module.exports = {
  getAllUser, getUserByUsername, getUserByName, login, createOrder

}