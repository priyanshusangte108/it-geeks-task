const express = require('express');
const { register, login, getme } = require('../controllers/authcontroller');

const router = express.Router();

router.post('/',register )
router.post('/login',login)
router.post('/getme',getme)

module.exports = router 