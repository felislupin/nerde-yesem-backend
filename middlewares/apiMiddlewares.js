'use strict';

const db = require('../db');
const dotenv = require('dotenv');
dotenv.config();

const keyAuth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json();
    }

    if (req.headers.authorization != process.env.ACCESS_KEY) {
        return res.status(401).json();
    } else {
        return next();
    }
};

module.exports = { keyAuth };