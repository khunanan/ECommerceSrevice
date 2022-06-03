const express = require("express");
const port = 3000;
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const eCommerceController = require('./src/controller/ECommerceController.js')
app.use('/e-commerce', eCommerceController)

const adminController = require('./src/controller/AdminController.js')
app.use('/admin', adminController)

app.listen(port,()=>{
    console.log("App Starting");
})
