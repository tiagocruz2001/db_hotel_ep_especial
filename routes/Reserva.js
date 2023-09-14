const express = require("express");
const router = express.Router();
const Reserva = require("../models/Reserva"); // Importa o modelo de dados para Reservas
const { isLoggedIn } = require('../middleware/authMiddleware');

// Adicionar Reserva
router.post("/reserva", isLoggedIn, async (req, res) => {
  const novareserva = new Reserva({
    utilizador: req.body.utilizador,
    quarto: req.body.quarto,
    numpessoas: req.body.numpessoas,
    check_in: req.body.check_in,
    check_out: req.body.check_out,
    precototal: req.body.precototal,
  });

  try {
    await novareserva.save(); // Salva a nova reserva no base de dados
    res.send("Reserva adicionada com sucesso");
  } catch (error) {
    return res.status(400).json({ error }); // Em caso de erro, retorna uma resposta de erro com o detalhe do erro
  }
});

// Mostrar todas as Reservas
router.get("/reservas", isLoggedIn, async (req, res) => {
  try {
    const reservas = await Reserva.find(); // Mostra todas as reservas na base de dados
    res.send(reservas); // Retorna a lista de reservas como resposta
  } catch (error) {
    return res.status(400).json({ error });
  }
});



// Remover Reserva
router.delete("/removerreserva", isLoggedIn, async (req, res) => {
  const idreserva = req.body.id;
  try {
    await Reserva.deleteOne({ _id: idreserva }); // Remove uma reserva da base de dados com base no ID fornecido
    res.send("Reserva removida com sucesso");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

// Editar Reserva
router.patch("/editarreserva", isLoggedIn, async (req, res) => {
  const idreserva = req.body.id;
  const novareserva = {
    utilizador: req.body.utilizador,
    quarto: req.body.quarto,
    numpessoas: req.body.numpessoas,
    check_in: req.body.check_in,
    check_out: req.body.check_out,
    precototal: req.body.precototal,
  };
  try {
    await Reserva.updateOne({ _id: idreserva }, novareserva); // Atualiza uma reserva com base no ID fornecido
    res.send("Reserva editada com sucesso");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router; // Exporta o router contendo todas as rotas relacionadas a Reservas
