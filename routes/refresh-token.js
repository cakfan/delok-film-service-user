const express = require('express')
const router = express.Router()
const handlerToken = require('./handler/token')
const { create, token } = handlerToken

router.post('/', create)
router.get('/', token)

module.exports = router