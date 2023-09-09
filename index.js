const express = require('express');

const app = express();

const db = require('./bd');
const utilizadorRoute = require('./routes/Utilizador');
const reservaRoute = require('./routes/Reserva');
const quartoRoute = require('./routes/Quarto');
const hotelRoute = require('./routes/Hotel');


app.use(express.json());
app.use('/api/utilizador', utilizadorRoute);
app.use('/api/hotel', hotelRoute);
app.use('/api/reserva', reservaRoute);
app.use('/api/quarto', quartoRoute);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));