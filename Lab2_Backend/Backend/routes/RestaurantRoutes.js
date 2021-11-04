const express = require('express')
const router = express.Router()
const { auth, checkAuth } = require('../config/passport')
const getAllRestaurant = require('../controllers/GetAllRestaurantsController')
const getRestaurant = require('../controllers/GetRestaurantController')
const getSelectedRestaurant = require('../controllers/GetSelectedRestaurantController')
const postRestaurant = require('../controllers/PostRestaurantController')
const updateRestaurant = require('../controllers/UpdateRestaurantController')

auth()
 
router.post('/add-restaurant', checkAuth, postRestaurant)
router.get('/fetch-restaurant', checkAuth, getRestaurant)
router.get('/all-restaurants', getAllRestaurant)
router.get('/selected-restaurant', checkAuth, getSelectedRestaurant)
router.put('/update-restaurant', checkAuth, updateRestaurant)

module.exports = router
