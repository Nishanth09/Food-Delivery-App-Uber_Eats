const express = require('express')
const router = express.Router()
const { auth, checkAuth } = require('../config/passport')
const customerOrderCancel = require('../controllers/CustomerOrderCancelController')
const getCustomerOrders = require('../controllers/GetCustomerOrdersController')
const getOrders = require('../controllers/GetOrdersController')
const postOrder = require('../controllers/PostOrderController')
const updateOrder = require('../controllers/UpdateOrderController')

auth()

router.post('/add-order', checkAuth, postOrder)
router.put('/update-order', checkAuth, updateOrder)
router.get('/fetch-orders', checkAuth, getOrders)
router.get('/customer-orders', checkAuth, getCustomerOrders)
router.put('/customer-cancel-order', checkAuth, customerOrderCancel)

module.exports = router
