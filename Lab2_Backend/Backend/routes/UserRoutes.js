const express = require('express')
const router = express.Router()
const { auth, checkAuth } = require('../config/passport')
const favoriteRestaurants = require('../controllers/FavoritesController')
const getFavorites = require('../controllers/GetFavoritesController')
const loginUser = require('../controllers/LoginController')
const logoutUser = require('../controllers/LogoutController')
const {createUser, createOwner} = require('../controllers/SignUpController')
const updateUser = require('../controllers/UpdateUserDetailsController')
const userDetails = require('../controllers/UserDetailsController')

auth()

router.post('/signup-user', createUser)
router.post('/signup-owner', createOwner)
router.post('/login', loginUser)
router.get('/logout', logoutUser)
router.get('/user-details', checkAuth, userDetails)
router.put('/user-details', checkAuth, updateUser)
router.put('/favorites',checkAuth, favoriteRestaurants)
router.get('/favorites',checkAuth, getFavorites)

module.exports = router
