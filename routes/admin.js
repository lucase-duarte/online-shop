const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin')

router.get('/add-product', adminController.getAddProduct)

router.post('/add-product', adminController.postAddProduct)

router.get('/admin-products', adminController.getAdminProducts)

router.get('/admin-product-detail/:id', adminController.getProductDetail)

router.post('/delete-product/:id', adminController.postDeleteProduct)

router.get('/edit-product/:id', adminController.getEditProduct)

router.post('/edit-product/:id', adminController.postEditProduct)

module.exports = router