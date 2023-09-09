const mongoose = require("mongoose");

const QuartoSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    preco: {
      type: Number,
      required: true,
    },
    maxPessoas: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    fotos: {
        type: [String],
      },
      numQuartosDisponiveis: {
        type: Number,
        required: true,
      },
  },
  { timestamps: true }
);

const modelQuarto = mongoose.model("quartos", QuartoSchema);
module.exports = modelQuarto;
