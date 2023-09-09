const mongoose = require("mongoose");

const UtilizadorSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
        type: String,
        required: true,
      },
    pais: {
      type: String,
      required: true,
    },
    cidade: {
      type: String,
      required: true,
    },
    contacto: {
      type: Number,
      required: true,
    },
    ativo: {
      type: Boolean,
      default: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const modelUtilizador = mongoose.model("utilizadores", UtilizadorSchema);

module.exports = modelUtilizador;