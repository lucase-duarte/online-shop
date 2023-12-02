const express = require('express')
const bodyParser = require('body-parser')
const shopRoutes = require('./routes/shop')
const adminRoutes = require('./routes/admin')
const mongoose = require('mongoose')

const app = express()
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(shopRoutes)
app.use('/admin', adminRoutes)

mongoose.connect('mongodb+srv://lucasduarte:<PASSWORD>@cluster0.v8f3lt2.mongodb.net/shop?retryWrites=true&w=majority')
.then(() => {
    console.log('Connected!')
    app.listen(3000, () => {
        console.log('Listening on port 3000')
    })
})