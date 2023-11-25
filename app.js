const express = require('express')
const bodyParser = require('body-parser')
const shopRoutes = require('./routes/shop')
const adminRoutes = require('./routes/admin')
const mongoConnect = require('./util/database').mongoConnect
const User = require('./models/user')
const { findById } = require('./models/product')

const app = express()
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs');
app.set('views', './views');

app.use((req, res, next) => {
    User.findById('655288d1fe6f0861bb4c41e8')
    .then(user => {
        req.user = new User(user.name, user.email, user._id, user.cart)
        console.log(req.user)
        next()
    })
    .catch(err => {
        console.log(err)
    })
})
app.use(shopRoutes)
app.use('/admin', adminRoutes)

mongoConnect(() => {
    app.listen(3000, () => {
        console.log('listening on port 3000.')
    })
})