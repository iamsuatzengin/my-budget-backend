const express = require("express");
const router = express.Router();

const registerController = require('../controllers/registerController')
const authController = require('../controllers/authController')
router.post('/register', registerController.register)
router.post('/login', authController.login)

module.exports = router