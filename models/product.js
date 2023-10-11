const fs = require('fs')
const path = require('path')
const p = path.join(__dirname, '..', 'data', 'products.json')

class Product {

    id = Math.random() * 10 .toString()
    name
    url
    price
    description

    constructor(name, url, price, description) {
      this.name = name;
      this.url = url;
      this.price = price;
      this.description = description;

    }

    save() {

      readFile(products => {
        products.push(this)
        products = JSON.stringify(products)
        writeFile(products)
      })

    }

    static fetchAll(cb) {

       readFile(cb)

    }

    static saveChanges(products) {

      products = JSON.stringify(products)
      writeFile(products)

    }

    static findById(productId, cb) {

      this.fetchAll(products => {
        const product = products.find(p => p.id == productId)
        cb(product)
      })

    }

  }

   function readFile(cb) {

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

  function writeFile(products) {

    fs.writeFile(p, products, (err) => {
      if(err) {
        console.log(err)
      }
    })
    
  }


  module.exports = Product