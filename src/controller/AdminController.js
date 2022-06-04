const express = require('express');
const router = express.Router();
const adminService = require('../services/AdminService');


router.get('/orders', async function (req, res, next) {
    try {
        const page = req.query.page;
        const requestSize = req.query.requestSize;
        const status = req.query.status;

        res.json(await adminService.getOrdersByStatus(page, requestSize, status));
    } catch (err) {
        console.error(`Error while getting programming languages `, err.message);
        next(err);
    }
});

module.exports = router;