const express = require("express");
const router = express.Router();
const Hotel = require("../models/Hotel");


// Adicionar Hotel

router.post("/hotel", async (req, res) => {
  const novohotel = new Hotel({
    nome: req.body.nome,
    cidade: req.body.cidade,
    endereco: req.body.endereco,
    fotos: req.body.fotos,
    desc: req.body.desc,
    quarto: req.body.quarto,
  });

  try {
    await novohotel.save();
    res.send("Hotel adicionado com sucesso");
  } catch (error) {
    return res.status(400).json({ error });
  }
});


// mostrar todos os hoteis

router.get("/hoteis", async (req, res) => {
  try {
    const hoteis = await Hotel.find();
    res.send(hoteis);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

// remover hotel

router.delete("/removerhotel", async (req, res) => {
  const idhotel = req.body.id;
  try {
    await Hotel.deleteOne({ _id: idhotel });
    res.send("Hotel removido com sucesso");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

// editar Hotel

router.patch("/editarhotel", async (req, res) => {
  const idhotel = req.body.id;
  const novohotel = {
    nome: req.body.nome,
    cidade: req.body.cidade,
    endereco: req.body.endereco,
    fotos: req.body.fotos,
    desc: req.body.desc,
    quarto: req.body.quarto,
  };
  try {
    await Hotel.updateOne({ _id: idhotel }, novohotel);
    res.send("Hotel editado com sucesso");
  } catch (error) {
    return res.status(400).json({ error });
  }
});


module.exports = router;