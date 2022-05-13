const express = require('express');
const ProductInformationMiddleware = require('./ProductInformationMiddleware');

const router = express.Router();
router.get('/', ProductInformationMiddleware);
router.get('/health-check', (req, res) => res.sendStatus(200));

module.exports = router;
