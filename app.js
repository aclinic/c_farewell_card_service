"use strict";

const express = require('express')
const mongoose = require('mongoose')
const path = require('path');
const cors = require('cors');

const app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname, 'build')));
app.use(cors({ origin: true, credentials: true }));

const port = process.env.PORT || 3000

const farewellSchema = new mongoose.Schema({
    author: String,
    farewellMessage: String
})

farewellSchema.methods.updateMessage = function (newFarewellMessage) {
    this.farewellMessage = newFarewellMessage
    console.log('Updated farewell message to ' + newFarewellMessage)
}

const Farewell = mongoose.model('Farewell', farewellSchema)

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/messages', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
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

app.put('/message', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    Farewell.updateOne({ _id: req.body._id }, { farewellMessage: req.body.farewellMessage }, null, function (err, farewell) {
        if (err) {
            console.error(err)
            res.send(err)
            return
        }
        res.send(farewell)
    })
})

app.post('/message', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const newFarewell = new Farewell({ author: req.body.author, farewellMessage: '' })
    newFarewell.save(function (err, farewell) {
        if (err) {
            console.error(err)
            res.send(err)
            return
        }
        console.log('Added farewell: ' + farewell)
        res.send(farewell)
    })
})

app.delete('/message', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
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

    let dbUri = 'mongodb://localhost/farewells'
    if (process.env.MONGODB_URI) {
        dbUri = process.env.MONGODB_URI;
    }
    return mongoose.connect(dbUri, {
        keepAlive: 1,
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}
