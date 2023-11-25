const mongodb = require('mongodb')
const getDb = require('../util/database').getDb

class Product {
  constructor(name, url, price, description, id) {
    this.name = name
    this.url = url
    this.description = description
    this.price = price
    this._id = id ? new mongodb.ObjectId(id) : null
  }

  save() {
    let query
    const db = getDb()

    if(this._id) {
      query = db.collection('products').updateOne({_id: this._id}, {$set: this})
    }

    else {
      query = db.collection('products').insertOne(this)
    }

    return query
    .then(result => {
      console.log(result)
    })
    .catch(err => {
      console.log(err)
    })
  }

  static fetchAll() {
    const db = getDb()

    return db.collection('products').find().toArray()
    .then(products => {
      return products
    })
    .catch(err => {
      console.log(err)
    })
  }

  static findById(productId) {
    const db = getDb()

    return db.collection('products').findOne({_id: new mongodb.ObjectId(productId)})
    .then(product => {
      return product
    })
    .catch(err => {
      console.log(err)
    })
  }

  static deleteById(productId) {
    const db = getDb()

    return db.collection('products').deleteOne({_id: new mongodb.ObjectId(productId)})
    .then(result => {
      console.log(result)
    })
    .catch(err => {
      console.log(err)
    })
  }
}

  module.exports = Product