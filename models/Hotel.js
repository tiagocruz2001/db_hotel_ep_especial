const mongoose = require("mongoose");

const HotelSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  cidade: {
    type: String,
    required: true,
  },
  endereco: {
    type: String,
    required: true,
  },
  fotos: {
    type: [String],
  },
  desc: {
    type: String,
    required: true,
  },
  quarto: {
    type: [String],
  },
});

const modelHotel = mongoose.model("hoteis", HotelSchema);
module.exports = modelHotel;