const express = require('express')
const router = express.Router()
const shopController = require('../controllers/shop')

router.get('/', shopController.getIndex)

router.get('/product-detail/:id', shopController.getProductDetail)

router.get('/cart', shopController.getCart)

router.post('/cart', shopController.postCart)

router.post('/delete-cart-product/:id', shopController.postDeleteCartProduct)

module.exports = router