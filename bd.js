const mongoose = require('mongoose');

var mongoURL = 'mongodb://diogoasantos:BANANA1234!@ac-n1czebd-shard-00-00.dgd0oqv.mongodb.net:27017,ac-n1czebd-shard-00-01.dgd0oqv.mongodb.net:27017,ac-n1czebd-shard-00-02.dgd0oqv.mongodb.net:27017/?ssl=true&replicaSet=atlas-iodx6p-shard-0&authSource=admin&retryWrites=true&w=majority';

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

var connection = mongoose.connection;

connection.on('error', () => {
    console.log('Mongo DB Connection failed')
})

connection.on('connected', () => {
    console.log('Mongo DB Connection Sucessfull')
})

module.exports = mongoose;