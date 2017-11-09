require('dotenv').config()
const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    massive = require('massive')
const c = require('./products_controller')


const app = express()
app.use(bodyParser.json())
app.use(cors())

const port = 3000

massive(process.env.CONNECTION_STRING)
    .then(db => {
        app.set('db', db)
    })

app.get('/api/products', c.getAll)

app.get('/api/product/:id', c.getOne)

app.put('/api/product/:id', c.update)

app.post('/api/product', c.create)

app.delete('/api/product/:id', c.delete)


app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})