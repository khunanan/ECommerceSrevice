const express = require('express');
const router = express.Router();
const userservics = require('../services/AdminService');
const bcrypt = require('bcrypt');
const config = require('../config/config');
const util = require('../utils/dateutil')


router.get('/all', async function (req, res, next) {
    try {
        const aa = await userservics.getAllUser(req.query.page)
        aa.data.forEach(element => {
            const bd = element.birthdate
            const db = util.parsDate(bd);
            const cc = util.calculateAge(db);
            console.log(cc);
        });

        res.json(aa);
    } catch (err) {
        console.error(`Error while getting programming languages `, err.message);
        next(err);
    }
});


router.get('/byUsername', async function (req, res, next) {
    try {
        const name = req.query.username;
        console.log(name);
        if (name != undefined) {
            res.json(await userservics.getUserByUsername(req.query.page, name));
        } else {
            res.status(400);
            res.json({ "message": "invalid parameter" });
        }
    } catch (err) {
        console.error(`Error while getting programming languages`, err.message);
        next(err);
    }
});

router.get('/byName', async function (req, res, next) {
    try {
        const name = req.query.name;

        res.json(await userservics.getUserByName(req.query.page, name));
    } catch (err) {
        console.error(`Error while getting programming languages `, err.message);
        next(err);
    }
});

router.post('/login', async function (req, res, next) {
    try {
        console.log(req.body);
        const name = req.body.username;
        const password = req.body.password;
        const response = await userservics.getLoginUser(req.body.page, name);
        if (response.data.length < 1) {
            res.status(404);
            res.json(response);
        } else {
            const dbpassword = response.data[0].password
            const valid = await bcrypt.compare(password, dbpassword)
            console.log(password + "" + dbpassword + "" + valid);
            if (valid == true) {
                const response2 = await userservics.getUserByUsername(req.body.page, name);
                res.json(response2);
            } else {
                res.status(404);
                res.json({ "message": "invalid username or password" });
            }
        }

    } catch (err) { 
        console.error(`Error while getting programming languages `, err.message);
        next(err);
    }
});

router.post('/register', async function (req, res, next) {
    try {
        console.log(req.body);
        const username = req.body.username;
        const password = req.body.password;
        const fristname = req.body.fristname;
        const lastname = req.body.lastname;
        const phone = req.body.phone;
        const email = req.body.email;
        const birthdate = req.body.birthdate;

        if (username != undefined || password != undefined || fristname != undefined || lastname != undefined || phone != undefined || email != undefined || birthdate != undefined) {
            const salt = await bcrypt.genSalt(config.saltRounds);
            const hashPassword = await bcrypt.hash(password, salt);
            res.json(await userservics.getUserRegister(username, hashPassword, fristname, lastname, phone, email, birthdate));
        } else {
            res.status(400);
            res.json({ "message": "invalid parameter" });
        }

    } catch (err) {
        console.error(`Error while getting programming languages `, err.message);
        next(err);
    }
});

module.exports = router;