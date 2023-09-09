const express = require("express");
const router = express.Router();
const Reserva = require("../models/Reserva");


// Adicionar Reserva

router.post("/reserva", async (req, res) => {
  const novareserva = new Reserva({
    utilizador: req.body.utilizador,
    quarto: req.body.quarto,
    numpessoas: req.body.numpessoas,
    check_in: req.body.check_in,
    check_out: req.body.check_out,
    precototal: req.body.precototal,
  });

  try {
    await novareserva.save();
    res.send("Reserva adicionada com sucesso");
  } catch (error) {
    return res.status(400).json({ error });
  }
});


// mostrar todas as Reservas

router.get("/reservas", async (req, res) => {
  try {
    const reservas = await Reserva.find();
    res.send(reservas);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

// remover Reserva

router.delete("/removerreserva", async (req, res) => {
  const idreserva = req.body.id;
  try {
    await Reserva.deleteOne({ _id: idreserva });
    res.send("Reserva removida com sucesso");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

// editar Reserva

router.patch("/editarreserva", async (req, res) => {
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
    await Reserva.updateOne({ _id: idreserva }, novareserva);
    res.send("Reserva editada com sucesso");
  } catch (error) {
    return res.status(400).json({ error });
  }
});


module.exports = router;