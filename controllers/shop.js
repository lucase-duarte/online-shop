const path = require('path')
const Product = require('../models/product')

exports.getIndex = (req, res) => {
    Product.find()
    .then(products => {
        res.render(path.join(__dirname, '..', 'views', 'shop', 'index'), {products: products, pageTitle: 'Online Shop', currentPage: 'index', cart: {items: []}})
    })
}

exports.getProductDetail = (req, res) => {
    const productId = req.params.id

    Product.findById(productId)
    .then(product => {
        res.render(path.join(__dirname, '..', 'views', 'shop', 'product-detail'), {product: product, pageTitle: product.name, currentPage: 'index', cart: {items: []}})
    })
}

exports.getCart = (req, res) => {
    user.getCartItems()
    .then(cartItems => {
        res.render(path.join(__dirname, '..', 'views', 'shop', 'cart'), {pageTitle: 'Carrinho', currentPage: 'cart', cart: {items: cartItems, totalPrice: user.cart.totalPrice}})
    })
}

exports.postCart = (req, res) => {
    const productId = req.body.productId
    const user = req.user

    Product.findById(productId)
    .then(product => {
        return user.addToCart(product)
    })
    .then(() => {
        res.redirect('/')
    })
}

exports.postDeleteCartProduct = (req, res) => {
    const productId = req.params.id
    const user = req.user

   user.deleteFromCart(productId)
   .then((result) => {
    console.log(result)
    res.redirect('/cart')
   })
}

exports.getOrders = (req, res) => {
    const user = req.user

    user.getOrders()
    .then(orders => {
        user.getCartItems()
        .then(cartItems => {
            res.render(path.join(__dirname, '..', 'views', 'shop', 'orders'), {pageTitle: 'Pedidos', currentPage: 'orders', cart: {items: cartItems}, orders: orders})
        })
    })
}

exports.postOrders = (req, res) => {
    const user = req.user

    user.createOrder()
    .then(() => {
        res.redirect('/')
    })
}
