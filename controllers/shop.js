const path = require('path')
const Product = require('../models/product')
const Cart = require('../models/cart')

exports.getIndex = (req, res) => {

    Product.fetchAll(products => {
        Cart.getCart(cart => {
            res.render(path.join(__dirname, '..', 'views', 'shop', 'index'), {products: products, pageTitle: 'Online Shop', currentPage: 'index', cart: cart})
        })
    })

}

exports.getProductDetail = (req, res) => {

    const productId = req.params.id

    Product.findById(productId, product => {
        Cart.getCart(cart => {
            res.render(path.join(__dirname, '..', 'views', 'shop', 'product-detail'), {product: product, pageTitle: product.name, currentPage: 'index', cart: cart})
        })
    })

}

exports.getCart = (req, res) => {

    Cart.getCart(cart => {
        res.render(path.join(__dirname, '..', 'views', 'shop', 'cart'), {pageTitle: 'Carrinho', currentPage: 'cart', cart: cart})
    })

}

exports.postCart = (req, res) => {

    const productId = req.body.productId

    Cart.addProduct(productId)
    res.redirect('/')

}

exports.postDeleteCartProduct = (req, res) => {

    const productId = req.params.id

    Cart.getCart(cart => {
        const product = cart.products.find((p) => p.id == productId)
        
        cart.totalPrice -= product.price * product.quantity
        cart.products = cart.products.filter(p => p.id != productId)
        Cart.updateCart(cart)
        res.redirect('/cart')
    })

}

