const path = require('path')
const Product = require('../models/product')
const Cart = require('../models/cart')

exports.getIndex = (req, res) => {
    res.render(path.join(__dirname, '..', 'views', 'shop', 'index'), {products: Product.fetchAll(), pageTitle: 'Online Shop', currentPage: 'index', cart: Cart.getCart()})
}

exports.getProductDetail = (req, res) => {
    const productId = req.params.id
    const product = Product.findById(productId)

    res.render(path.join(__dirname, '..', 'views', 'shop', 'product-detail'), {product: product, pageTitle: product.name, currentPage: 'index', cart: Cart.getCart()})

}

exports.getCart = (req, res) => {
    res.render(path.join(__dirname, '..', 'views', 'shop', 'cart'), {pageTitle: 'Carrinho', currentPage: 'cart', cart: Cart.getCart()})
}

exports.postCart = (req, res) => {
    const productId = req.body.productId
    Cart.addProduct(productId)

    res.redirect('/')
}

exports.postDeleteCartProduct = (req, res) => {
    const productId = req.params.id
    const cart = Cart.getCart()
    const product = cart.products.find((p) => p.id == productId)
    cart.totalPrice -= product.price * product.quantity
    cart.products = cart.products.filter(p => p.id != productId)
    Cart.updateCart(cart)

    res.redirect('/cart')
}

