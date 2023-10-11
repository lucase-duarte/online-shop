const path = require('path')
const Product = require('../models/product')
const Cart = require('../models/cart')

exports.getAddProduct = (req, res) => {

    Cart.getCart(cart => {
        res.render(path.join(__dirname, '..', 'views', 'admin', 'add-product'), {pageTitle: 'Adicionar produto', currentPage: 'add-product', cart: cart})
    })

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

    Product.fetchAll(products => {
        Cart.getCart(cart => {
            res.render(path.join(__dirname, '..', 'views', 'admin', 'admin-products'), {products: products, pageTitle: 'Produtos(admin)', currentPage: 'admin-products', cart: cart})
        })
    })

}

exports.getProductDetail = (req, res) => {

    const productId = req.params.id

    Product.findById(productId, product => {
        Cart.getCart(cart => {
            res.render(path.join(__dirname, '..', 'views', 'admin', 'admin-product-detail'), {product: product, pageTitle: product.name, currentPage: 'admin-product-detail', cart: cart})
        })
    })

}

exports.postDeleteProduct = (req, res) => {

    const productId = req.params.id

    Product.fetchAll(products => {
        products = products.filter((product) => product.id != productId);
        Product.saveChanges(products)
        res.redirect('/admin/admin-products')
    })

}

exports.getEditProduct = (req, res) => {

    const productId = req.params.id

    Product.fetchAll(products => {
        const product = products.filter((p) => p.id == productId)[0]

        Cart.getCart(cart => {
            res.render(path.join(__dirname, '..', 'views', 'admin', 'edit-product'), {product: product, pageTitle: 'Editar produto', currentPage: 'edit-product', cart: cart})
        })
    })

}

exports.postEditProduct = (req, res) => {

    const productId = req.params.id
    const updatedName = req.body.productName
    const updatedUrl = req.body.productImage
    const updatedPrice = req.body.productPrice
    const updatedDescription = req.body.productDescription

    Product.fetchAll(products => {
        products = products.map((product) => {
            if(product.id == productId) {
                product.name = updatedName
                product.url = updatedUrl
                product.price = updatedPrice
                product.description = updatedDescription
            }
    
            return product
        })
        
        Product.saveChanges(products)
        res.redirect('/admin/admin-products')

    })
    

}
