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
      let products = readFile()
      products.push(this)
      products = JSON.stringify(products)
 
      fs.writeFileSync(p, products, (err) => {
        console.log(err)
      })    
    }

    static fetchAll() {
      return readFile()
    }

    static saveChanges(products) {
      products = JSON.stringify(products)

      fs.writeFileSync(p, products, (err) => {
        console.log(err)
      })    
    }

    static findById(productId) {
      const products = this.fetchAll()
      const product = products.find(p => p.id == productId)
      return product
    }
  }

   function readFile() {
    let products = []
    let data

    try {
      data = fs.readFileSync(p)
    }

    catch(err) {
      console.log(err)
    }
    
    if(data) {
      products = JSON.parse(data)
    }

    return products

  }


  module.exports = Product