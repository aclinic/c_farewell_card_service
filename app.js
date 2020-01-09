"use strict";

const express = require('express')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())

const port = 3000

const farewellSchema = new mongoose.Schema({
    author: String,
    farewellMessage: String
})

farewellSchema.methods.updateMessage = function (newFarewellMessage) {
    this.farewellMessage = newFarewellMessage
    console.log('Updated farewell message to ' + newFarewellMessage)
}

const Farewell = mongoose.model('Farewell', farewellSchema)

app.get('/', (req, res) => {
    Farewell.find(function (err, farewell) {
        if (err) {
            console.error(err)
            res.send(err)
            return
        }
        res.send(farewell.map((rawMsg) => {
            return { author: rawMsg.author, farewellMessage: rawMsg.farewellMessage }
        }))
    })
})

app.get('/admin', (req, res) => {
    Farewell.find(function (err, farewell) {
        if (err) {
            console.error(err)
            res.send(err)
            return
        }
        res.send(farewell)
    })
})

app.put('/', (req, res) => {
    Farewell.updateOne({ _id: req.body._id }, { farewellMessage: req.body.farewellMessage }, null, function (err, farewell) {
        if (err) {
            console.error(err)
            res.send(err)
            return
        }
        res.send(farewell)
    })
})

app.post('/', (req, res) => {
    const newFarewell = new Farewell({ author: req.body.author, farewellMessage: '' })
    newFarewell.save(function (err, farewell) {
        if (err) {
            console.error(err)
            res.send(err)
            return
        }
        res.send(farewell)
    })
})

app.delete('/', (req, res) => {
    Farewell.deleteOne({ _id: req.body._id }, null, function (err, farewell) {
        if (err) {
            console.error(err)
            res.send(err)
            return
        }
        res.send(farewell)
    })
})

connect()

function listen() {
    app.listen(port, () => console.log(`Express app started on port ' + port`))
}

function connect() {
    mongoose.connection
        .on('error', console.log)
        .on('disconnected', connect)
        .once('open', listen);

    // TODO: Supply actual DB via config fil
    return mongoose.connect('mongodb://localhost/farewells', {
        keepAlive: 1,
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}
