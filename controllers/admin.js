const path = require('path')
const Product = require('../models/product')
const Cart = require('../models/cart')

exports.getAddProduct = (req, res) => {
    res.render(path.join(__dirname, '..', 'views', 'admin', 'add-product'), {pageTitle: 'Adicionar produto', currentPage: 'add-product', cart: Cart.getCart()})
}

exports.postAddProduct = (req, res) => {
    const name = req.body.productName
    const url = req.body.productImage
    const price = req.body.productPrice
    const description = req.body.productDescription

    const product = new Product(name, url, price, description)
    product.save()

    res.redirect('/')
}

exports.getAdminProducts = (req, res) => {
    res.render(path.join(__dirname, '..', 'views', 'admin', 'admin-products'), {products: Product.fetchAll(), pageTitle: 'Produtos-admin', currentPage: 'admin-products', cart: Cart.getCart()})
}

exports.getProductDetail = (req, res) => {
    const productId = req.params.id
    const product = Product.findById(productId)

    res.render(path.join(__dirname, '..', 'views', 'admin', 'admin-product-detail'), {product: product, pageTitle: product.name, currentPage: 'admin-products', cart: Cart.getCart()})

}

exports.postDeleteProduct = (req, res) => {
    const productId = req.params.id
    let products = Product.fetchAll()
    products = products.filter((product) => product.id != productId);
    Product.saveChanges(products)

    res.redirect('/admin/admin-products')
}

exports.getEditProduct = (req, res) => {
    const productId = req.params.id
    const products = Product.fetchAll()
    const product = products.filter((p) => p.id == productId)[0]

    res.render(path.join(__dirname, '..', 'views', 'admin', 'edit-product'), {product: product, pageTitle: 'Editar produto', currentPage: 'edit-product', cart: Cart.getCart()})
}

exports.postEditProduct = (req, res) => {
    const productId = req.params.id
    const updatedName = req.body.productName
    const updatedUrl = req.body.productImage
    const updatedPrice = req.body.productPrice
    const updatedDescription = req.body.productDescription
    let products = Product.fetchAll()

    products = products.map((p) => {
        if(p.id == productId) {
            p.name = updatedName
            p.url = updatedUrl
            p.price = updatedPrice
            p.description = updatedDescription
        }

        return p
    })

    console.log(products)

    Product.saveChanges(products)

    res.redirect('/admin/admin-products')
}
