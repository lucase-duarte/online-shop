const fs = require('fs')
const path = require('path')
const p = path.join(__dirname, '..', 'data', 'cart.json')
const Product = require('./product')

class Cart {

    static addProduct(productId) {
      let cart = this.getCart()

      const product = Product.findById(productId)
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

      fs.writeFileSync(p, cart, (err) => {
        console.log(err)
      })    
    }

    static getCart() {
      let cart = {}
      let data
      try {
          data = fs.readFileSync(p)
        }
    
        catch(err) {
          console.log(err)
        }
        
        if(data) {
         cart = JSON.parse(data)
        }

        return cart
    }

    static updateCart(cart) {
      cart = JSON.stringify(cart)

      fs.writeFileSync(p, cart, (err) => {
        console.log(err)
      })    
    }
}

module.exports = Cart