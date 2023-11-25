const path = require('path')
const Product = require('../models/product')

exports.getAddProduct = (req, res) => {
const user = req.user

    user.getCartItems()
    .then(cartItems => {
        res.render(path.join(__dirname, '..', 'views', 'admin', 'add-product'), {pageTitle: 'Adicionar produto', currentPage: 'add-product', cart: {items: cartItems}})
    })
}

exports.postAddProduct = (req, res) => {
    const name = req.body.productName
    const url = req.body.productImage
    const price = req.body.productPrice
    const description = req.body.productDescription
    const product = new Product(name, url, price, description)

    product.save()
    .then(() => {
        res.redirect('/')
    })
}

exports.getAdminProducts = (req, res) => {
const user = req.user

    Product.fetchAll()
    .then(products => {
        user.getCartItems()
        .then(cartItems => {
            res.render(path.join(__dirname, '..', 'views', 'admin', 'admin-products'), {products: products, pageTitle: 'Produtos(admin)', currentPage: 'admin-products', cart: {items: cartItems}})
        })
    })
}

exports.getProductDetail = (req, res) => {
    const productId = req.params.id
    const user = req.user

    Product.findById(productId)
    .then(product => {
        user.getCartItems()
        .then(cartItems => {
            res.render(path.join(__dirname, '..', 'views', 'admin', 'admin-product-detail'), {product: product, pageTitle: product.name, currentPage: 'admin-product-detail', cart: {items: cartItems}})
        })
    })
}

exports.postDeleteProduct = (req, res) => {
    const productId = req.params.id

    Product.deleteById(productId)
    .then(() => {
        res.redirect('/admin/admin-products')
    })
}

exports.getEditProduct = (req, res) => {
    const productId = req.params.id
    const user = req.user

    Product.findById(productId)
    .then(product => {
        user.getCartItems()
        .then(cartItems => {
                res.render(path.join(__dirname, '..', 'views', 'admin', 'edit-product'), {product: product, pageTitle: 'Editar produto', currentPage: 'edit-product', cart: {items: cartItems}})
            })
    })
}

exports.postEditProduct = (req, res) => {
    const productId = req.params.id
    const updatedName = req.body.productName
    const updatedUrl = req.body.productImage
    const updatedPrice = req.body.productPrice
    const updatedDescription = req.body.productDescription
    const product = new Product(updatedName, updatedUrl, updatedPrice, updatedDescription, productId)

    product.save()
    .then(() => {
        res.redirect('/admin/admin-products')
    })
}