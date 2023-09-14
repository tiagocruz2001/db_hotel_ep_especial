const express = require("express");
const router = express.Router();
const Hotel = require("../models/Hotel");
const { isLoggedIn } = require('../middleware/authMiddleware');

// Importar os módulos necessários, incluindo o Express para criar rotas.

// Adicionar Hotel
router.post("/hotel", isLoggedIn, async (req, res) => {
  // Rota HTTP POST para adicionar um novo hotel na base de dados.
  const novohotel = new Hotel({
    // Cria uma nova instância de Hotel com base nos dados recebidos na solicitação (req.body).
    nome: req.body.nome,
    cidade: req.body.cidade,
    endereco: req.body.endereco,
    fotos: req.body.fotos,
    desc: req.body.desc,
    quarto: req.body.quarto,
  });

  try {
    // Tenta salvar o novo hotel na base de dados.
    await novohotel.save();
    res.send("Hotel adicionado com sucesso");
  } catch (error) {
    // Em caso de erro, retorna uma resposta de erro com status 400 e informações de erro em formato JSON.
    return res.status(400).json({ error });
  }
});

// mostrar todos os hoteis
router.get("/hoteis", async (req, res) => {
  // Rota HTTP GET para recuperar todos os hotéis da base de dados.
  try {
    const hoteis = await Hotel.find();
    res.send(hoteis);
  } catch (error) {
    // Em caso de erro, retorna uma resposta de erro com status 400 e informações de erro em formato JSON.
    return res.status(400).json({ error });
  }
});

// remover hotel
router.delete("/removerhotel", isLoggedIn,async (req, res) => {
  // Rota HTTP DELETE para remover um hotel com base no ID fornecido na solicitação (req.body.id).
  const idhotel = req.body.id;
  try {
    // Tenta excluir o hotel do base de dados com base no ID.
    await Hotel.deleteOne({ _id: idhotel });
    res.send("Hotel removido com sucesso");
  } catch (error) {
    // Em caso de erro, retorna uma resposta de erro com status 400 e informações de erro em formato JSON.
    return res.status(400).json({ error });
  }
});

// editar Hotel
router.patch("/editarhotel",isLoggedIn, async (req, res) => {
  // Rota HTTP PATCH para editar um hotel com base no ID fornecido na solicitação (req.body.id).
  const idhotel = req.body.id;
  const novohotel = {
    // Define os campos do hotel a serem atualizados com base nos dados fornecidos na solicitação (req.body).
    nome: req.body.nome,
    cidade: req.body.cidade,
    endereco: req.body.endereco,
    fotos: req.body.fotos,
    desc: req.body.desc,
    quarto: req.body.quarto,
  };
  try {
    // Tenta atualizar o hotel na base de dados com base no ID.
    await Hotel.updateOne({ _id: idhotel }, novohotel);
    res.send("Hotel editado com sucesso");
  } catch (error) {
    // Em caso de erro, retorna uma resposta de erro com status 400 e informações de erro em formato JSON.
    return res.status(400).json({ error });
  }
});

module.exports = router;
// Exporta o roteador para uso em outros lugares do aplicativo.
