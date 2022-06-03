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
        
        res.json(await eCommerceServics.getOrdersbyStatus(page,requestSize, status));
    } catch (err) {
        console.error(`Error while getting programming languages `, err.message);
        next(err);
    }
});

router.get('/categories', async function (req, res, next) {
    try {
        const name = req.query.categoryName;

        res.json(await menuservics.getMenuBycategoryName(req.query.page, name));
    } catch (err) {
        console.error(`Error while getting programming languages `, err.message);
        next(err);
    }
});


router.get('/price', async function (req, res, next) {
    try {
        const startPrice = req.query.startPrice;
        const endPrice = req.query.endPrice;

        if (isNaN(startPrice) || isNaN(endPrice)) {
            res.status(400);
            res.json({ "message": "invalid parameter" });
        } else {
            res.json(await menuservics.getMenuByPrice(req.query.page, startPrice, endPrice));
        }
    } catch (err) {
        console.error(`Error while getting programming languages `, err.message);
        next(err);
    }
});


router.get('/dish/atleast', async function (req, res, next) {
    try {
        const count = req.query.count;

        res.json(await menuservics.getMenuByCountAtleast(req.query.page, count));
    } catch (err) {
        console.error(`Error while getting programming languages `, err.message);
        next(err);
    }
});


router.get('/dish/lessthan', async function (req, res, next) {
    try {
        const count = req.query.count;

        res.json(await menuservics.getMenuByCountLessThan(req.query.page, count));
    } catch (err) {
        console.error(`Error while getting programming languages `, err.message);
        next(err);
    }
});

module.exports = router;

