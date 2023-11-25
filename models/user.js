const mongodb = require('mongodb')
const getDb = require('../util/database').getDb

class User {
    cart = {items : [], totalPrice: 0}

    constructor(name, email, userId, cart) {
        this.name = name
        this.email = email
        this._id = userId ? new mongodb.ObjectId(userId) : null
        this.cart = cart
    }

    save() {
        const db = getDb()

        return db.collection('users').insertOne(this)
    }

    static findById(userId) {
        const db = getDb()

        return db.collection('users').findOne({_id: new mongodb.ObjectId(userId)})
    }

    addToCart(product) {
        const cartProductIndex = this.cart.items.findIndex(cp => {
            return cp.productId.toString() === product._id.toString()
        })
        const updatedCart = {...this.cart}
        const db = getDb()

        if(cartProductIndex >= 0) {
            updatedCart.items[cartProductIndex].quantity++
        }

        else {
            updatedCart.items.push({productId: product._id, price: +product.price, quantity: 1})
        }

        updatedCart.totalPrice += +product.price
        return db.collection('users').updateOne({_id: this._id}, {$set: {cart: updatedCart}})
        .then(result => {
            console.log(result)
        })
        .catch(err => {
            console.log(err)
        })
    }

    getCartItems() {
        const db = getDb()
        const productIds = this.cart.items.map(i => {
            return i.productId
        })

        return db.collection('products').find({_id: {$in: productIds}}).toArray()
        .then(products => {
            return products.map(p => {
                return {...p, quantity: this.cart.items.find(cp => {
                    return cp.productId.toString() === p._id.toString()
                }).quantity}
            })
        })
    }

    deleteFromCart(productId) {
        const db = getDb()
        let updatedCart = {...this.cart}
        const product = updatedCart.items.filter(p => {
            return p.productId.toString() === productId.toString()
        })[0]

        updatedCart.totalPrice -= +product.price * +product.quantity
        updatedCart.items = updatedCart.items.filter(p => {
            return p.productId.toString() !== productId.toString()
        })

        return db.collection('users').updateOne({_id: this._id}, {$set: {cart: updatedCart}})
    }

    createOrder() {
        const db = getDb()
        
        return this.getCartItems()
        .then(products => {
            const order = {
                items: products,
                totalPrice: this.cart.totalPrice,
                user: {
                    _id: this._id,
                    name: this.name,
                    email: this.email
                }
            }

            return db.collection('orders').insertOne(order)
            .then(() => {
                this.cart = {items: [], totalPrice: 0}
                db.collection('users').updateOne({_id: this._id}, {$set: {cart: this.cart}})
            })
        })
    }

    getOrders() {
        const db = getDb()

        return db.collection('orders').find({'user._id': this._id}).toArray()
        .then(orders => {
            console.log(orders, 'hhjhhjh')
            return orders
        })
        .catch(err => {
            console.log(err)
        })
    }
}

module.exports = User