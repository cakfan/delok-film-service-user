const express = require('express')
const router = express.Router()
const handlerUser = require('./handler/users')
const { listUser, getUser, update, register, login, logout } = handlerUser

/* Get list users */
router.get('/', listUser)

/* Get user by id */
router.get('/:id', getUser)

/* Update user */
router.put('/:id', update)

/* Register a new user */
router.post('/register', register)

/* Login user */
router.post('/login', login)

/* Logout user */
router.post('/logout', logout)

module.exports = router
