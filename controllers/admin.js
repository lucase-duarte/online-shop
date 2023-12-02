const path = require('path')
const Product = require('../models/product')

exports.getAddProduct = (req, res) => {
    res.render(path.join(__dirname, '..', 'views', 'admin', 'add-product'), {pageTitle: 'Adicionar produto', currentPage: 'add-product', cart: {items: []}})
}

exports.postAddProduct = (req, res) => {
    const name = req.body.productName
    const url = req.body.productImage
    const price = req.body.productPrice
    const description = req.body.productDescription
    const product = new Product({name: name, url: url, price: price, description: description})

    product.save()
    .then(() => {
        res.redirect('/')
    })
}

exports.getAdminProducts = (req, res) => {
    Product.find()
    .then(products => {
        res.render(path.join(__dirname, '..', 'views', 'admin', 'admin-products'), {products: products, pageTitle: 'Produtos(admin)', currentPage: 'admin-products', cart: {items: []}})
    })
}

exports.getProductDetail = (req, res) => {
    const productId = req.params.id

    Product.findById(productId)
    .then(product => {
        res.render(path.join(__dirname, '..', 'views', 'admin', 'admin-product-detail'), {product: product, pageTitle: product.name, currentPage: 'admin-product-detail', cart: {items: []}})
    })
}

exports.postDeleteProduct = (req, res) => {
    const productId = req.params.id

    Product.findByIdAndDelete(productId)
    .then(() => {
        res.redirect('/admin/admin-products')
    })
}

exports.getEditProduct = (req, res) => {
    const productId = req.params.id

    Product.findById(productId)
    .then(product => {
        res.render(path.join(__dirname, '..', 'views', 'admin', 'edit-product'), {product: product, pageTitle: 'Editar produto', currentPage: 'edit-product', cart: {items: []}})
    })
}

exports.postEditProduct = (req, res) => {
    const productId = req.params.id
    const updatedName = req.body.productName
    const updatedUrl = req.body.productImage
    const updatedPrice = req.body.productPrice
    const updatedDescription = req.body.productDescription
    
    Product.findById(productId)
    .then(product => {
        product.name = updatedName
        product.url = updatedUrl
        product.price = updatedPrice
        product.description = updatedDescription

        product.save()
        .then(() => {
            res.redirect('/admin/admin-products')
        })
    })
}