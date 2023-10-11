const fs = require('fs')
const path = require('path')
const p = path.join(__dirname, '..', 'data', 'cart.json')
const Product = require('./product')

class Cart {

    static addProduct(productId) {

      this.getCart(cart => {
        Product.findById(productId, product => {
          let cartProduct = cart.products.find(p => p.id == productId)

          if(cartProduct) {
            cartProduct.quantity++
            cart.products[cart.products.findIndex(p => p == cartProduct)] = cartProduct
          }
    
          else {
            cartProduct = {id: productId, name: product.name, url: product.url, quantity: 1, price: product.price}
            cart.products.push(cartProduct)
          }
    
          cart.totalPrice += parseFloat(cartProduct.price)
          cart = JSON.stringify(cart)
    
          fs.writeFile(p, cart, (err) => {
            console.log(err)
          })    
        })
      })
 
    }

    static getCart(cb) {
      fs.readFile(p, (err, data) => {
        if(err) {
          console.log(err)
          cb([])
        }

        else {
          cb(JSON.parse(data))
        }
      })
    }

    static updateCart(cart) {
      cart = JSON.stringify(cart)

      fs.writeFile(p, cart, (err) => {
        console.log(err)
      })    
    }
}

module.exports = Cart