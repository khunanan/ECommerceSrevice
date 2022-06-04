const express = require('express');
const { json } = require('express/lib/response');
const router = express.Router();
const eCommerceServics = require('../services/ECommerceServics');

router.get('/products', async function (req, res, next) {
    try {
        const page = req.query.page;
        const requestSize = req.query.requestSize;
        const gender = req.query.gender;
        const category = req.query.category;
        const size = req.query.size;
        if (isNaN(page) || isNaN(requestSize)) {
            res.status(400);
            res.json({ "message": "invalid request" })
        } else {
            res.json(await eCommerceServics.getProductListbyCondition(page, requestSize, gender, category, size));
        }

    } catch (err) {
        console.error(`Error while getting programming languages `, err.message);
        next(err);
    }
});

router.get('/orders', async function (req, res, next) {
    try {
        const page = req.query.page;
        const requestSize = req.query.requestSize;
        const status = req.query.status;

        res.json(await eCommerceServics.getOrdersbyStatus(page, requestSize, status));
    } catch (err) {
        console.error(`Error while getting programming languages `, err.message);
        next(err);
    }
});

router.post('/createOrder', async function (req, res, next) {
    try {
        const address = req.body.address;

        res.json(await eCommerceServics.createOrder(address));
    } catch (err) {
        console.error(`Error while getting programming languages `, err.message);
        next(err);
    }
});

module.exports = router;

