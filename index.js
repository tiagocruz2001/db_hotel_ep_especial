const express = require('express');
const app = express();

// Importa a configuração da conexão com a base de dados MongoDB
const db = require('./bd');

// Importa os roteadores para cada entidade/modelo (Utilizador, Reserva, Quarto, Hotel)
const utilizadorRoute = require('./routes/Utilizador');
const reservaRoute = require('./routes/Reserva');
const quartoRoute = require('./routes/Quarto');
const hotelRoute = require('./routes/Hotel');

// Configura o middleware para permitir que o Express analise solicitações JSON
app.use(express.json());

// Define as rotas para cada entidade/modelo
app.use('/api/utilizador', utilizadorRoute);
app.use('/api/hotel', hotelRoute);
app.use('/api/reserva', reservaRoute);
app.use('/api/quarto', quartoRoute);

// Define a porta em que o servidor irá escutar. Usando process.env.PORT para permitir que a porta seja definida externamente (por exemplo, em um ambiente de hospedagem).
const port = process.env.PORT || 5000;

// Inicia o servidor e ouve na porta especificada
app.listen(port, () => console.log(`Server running on port ${port}`));
