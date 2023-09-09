const mongoose = require("mongoose");
const ReservaSchema = new mongoose.Schema({
  utilizador: {
    type: String,
    required: true,
  },
  quarto: {
    type: String,
    required: true,
  },
  numpessoas: {
    type: Number,
    required: true,
  },
  check_in: {
    type: Date,
    required: true,
  },
  check_out: {
    type: Date,
    required: true,
  },
  precototal: {
    type: Number,
    required: true,
  },
});

const modelReserva = mongoose.model("reservas", ReservaSchema);
module.exports = modelReserva;