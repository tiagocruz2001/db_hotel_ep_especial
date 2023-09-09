const express = require("express");
const router = express.Router();
const Quarto = require("../models/Quarto");


// Adicionar Quarto

router.post("/quarto", async (req, res) => {
  const novoquarto = new Quarto({
    nome: req.body.nome,
    preco: req.body.preco,
    maxPessoas: req.body.maxPessoas,
    desc: req.body.desc,
    fotos: req.body.fotos,
    numQuartosDisponiveis: req.body.numQuartosDisponiveis,
  });

  try {
    await novoquarto.save();
    res.send("Quarto adicionado com sucesso");
  } catch (error) {
    return res.status(400).json({ error });
  }
});


// mostrar todos os Quartos

router.get("/quartos", async (req, res) => {
  try {
    const quartos = await Quarto.find();
    res.send(quartos);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

// remover Quarto

router.delete("/removerquarto", async (req, res) => {
  const idquarto = req.body.id;
  try {
    await Quarto.deleteOne({ _id: idquarto });
    res.send("Quarto removido com sucesso");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

// editar Quarto

router.patch("/editarquarto", async (req, res) => {
  const idquarto = req.body.id;
  const novoquarto = {
    nome: req.body.nome,
    preco: req.body.preco,
    maxPessoas: req.body.maxPessoas,
    desc: req.body.desc,
    fotos: req.body.fotos,
    numQuartosDisponiveis: req.body.numQuartosDisponiveis,
  };
  try {
    await Quarto.updateOne({ _id: idquarto }, novoquarto);
    res.send("Quarto editado com sucesso");
  } catch (error) {
    return res.status(400).json({ error });
  }
});


module.exports = router;