const mongoose = require('mongoose');

// URL de conexão com a base de dados MongoDB. 
var mongoURL = 'mongodb://diogoasantos:BANANA1234!@ac-n1czebd-shard-00-00.dgd0oqv.mongodb.net:27017,ac-n1czebd-shard-00-01.dgd0oqv.mongodb.net:27017,ac-n1czebd-shard-00-02.dgd0oqv.mongodb.net:27017/?ssl=true&replicaSet=atlas-iodx6p-shard-0&authSource=admin&retryWrites=true&w=majority';

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

var connection = mongoose.connection;

// Evento para lidar com erros de conexão
connection.on('error', () => {
    console.log('A conexão à base de dados falhou');
})

// Evento que é disparado quando a conexão com o banco de dados é estabelecida com sucesso
connection.on('connected', () => {
    console.log('A conexão à base de dados foi realizada com sucesso');
})

module.exports = mongoose; // Exporta o objeto mongoose configurado para uso  noutros módulos 
