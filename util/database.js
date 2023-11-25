const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient
let db

const mongoConnect = (callback) => {
    mongoClient.connect('mongodb+srv://lucasduarte:<PASSWORD>@cluster0.v8f3lt2.mongodb.net/shop?retryWrites=true&w=majority')
    .then(client => {
        console.log('connected!')
        db = client.db()
        callback()
    })
    .catch(err => {
        console.log(err)
        throw err
    })
}

const getDb = () => {
    if(db) {
        return db
    }

    throw 'no database found'
}

exports.mongoConnect = mongoConnect
exports.getDb = getDb