const express = require('express')
const bodyParser = require('body-parser')
const shopRoutes = require('./routes/shop')
const adminRoutes = require('./routes/admin')
const path = require('path')

const app = express()
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(shopRoutes)
app.use('/admin', adminRoutes)

app.listen(3000, () => {
    console.log('listening on port 3000')
})
