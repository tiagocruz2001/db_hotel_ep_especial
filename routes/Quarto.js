const express = require("express");
const router = express.Router();
const Quarto = require("../models/Quarto"); // Importa o modelo de dados para Quartos
const { isLoggedIn } = require('../middleware/authMiddleware');
// Adicionar Quarto
router.post("/quarto",isLoggedIn, async (req, res) => {
  const novoquarto = new Quarto({
    nome: req.body.nome,
    hotel: req.body.hotel,
    preco: req.body.preco,
    maxPessoas: req.body.maxPessoas,
    desc: req.body.desc,
    fotos: req.body.fotos,
    numQuartosDisponiveis: req.body.numQuartosDisponiveis,
  });

  try {
    await novoquarto.save(); // Guarda o novo quarto na base de dados
    res.send("Quarto adicionado com sucesso");
  } catch (error) {
    return res.status(400).json({ error }); // Em caso de erro, retorna uma resposta de erro com o detalhe do erro
  }
});

// Mostrar todos os Quartos - Admin
router.get("/quartos",isLoggedIn, async (req, res) => {
  try {
    const quartos = await Quarto.find(); // Mostra todos os quartos na base de dados
    res.send(quartos); // Retorna a lista de quartos como resposta
  } catch (error) {
    return res.status(400).json({ error });
  }
});

// Mostrar todos por hotel

router.post("/quartoshotel", async (req, res) => {
  const hotelid = req.body.hotel;
  try {
    const quartos = await Quarto.find({ hotel: hotelid }); // Mostra todos os quartos por hotel
    
    res.send(quartos); // Retorna a lista de quartos como resposta
  } catch (error) {
    return res.status(400).json({ error });
  }
});



// Remover Quarto
router.delete("/removerquarto",isLoggedIn, async (req, res) => {
  const idquarto = req.body.id;
  try {
    await Quarto.deleteOne({ _id: idquarto }); // Remove um quarto da base de dados com base no ID fornecido
    res.send("Quarto removido com sucesso");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

// Editar Quarto
router.patch("/editarquarto",isLoggedIn, async (req, res) => {
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
    await Quarto.updateOne({ _id: idquarto }, novoquarto); // Atualiza um quarto com base no ID fornecido
    res.send("Quarto editado com sucesso");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router; // Exporta o router contendo todas as rotas relacionadas a Quartos
