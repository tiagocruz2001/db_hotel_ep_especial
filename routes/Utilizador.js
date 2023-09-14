const express = require("express");
const router = express.Router();
const Utilizador = require("../models/Utilizador");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const SECRET = "dsiaju32190msdkaj3012"; // Secret key para autenticação JWT
const { isLoggedIn } = require('../middleware/authMiddleware');

// Registar Utilizador
router.post("/registar", async (req, res) => {
  const novoutilizador = new Utilizador({
    username: req.body.username,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10), // Hash da senha antes de armazená-la na base de dados
    pais: req.body.pais,
    cidade: req.body.cidade,
    contacto: req.body.contacto,
  });

  try {
    await novoutilizador.save(); // Salva o novo utilizador na base de dados
    res.send("Utilizador registado com sucesso");
  } catch (error) {
    return res.status(400).json({ error }); // Em caso de erro, retorna uma resposta de erro com o detalhe do erro
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try { 
    const user = await Utilizador.findOne({ email: email });
    if (user) {
      const result = await bcrypt.compare(password, user.password);
      if (result) {
        const token = jwt.sign({ email: user.email }, SECRET)
        res.send({ token });
      } else {
        return res.status(400).json({ message: 'Não conseguio efetuar o login' });
      }
    } else {
      return res.status(400).json({ message: 'Não conseguio efetuar o login' })
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

// Mostrar o utilizador pela token

router.get("/getutilizador", async (req, res) => {
  const authorization = req.headers.authorization;

  try {
    if (!authorization) {
      res.status(400).json({ message: 'Token inválido' })
    } else {
      const decodedToken = jwt.decode(authorization, SECRET);
      if (decodedToken) {
        const user = await Utilizador.findOne({ email: decodedToken.email });
        res.send(user);
      } else {  
        return res.status(400).json({ error });
      }
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});



// Mostrar todos os Utilizadores
router.get("/utilizadores", isLoggedIn,async (req, res) => {
  try {
    const utilizadores = await Utilizador.find(); // Mostra todos os utilizadores no base de dados
    res.send(utilizadores); // Retorna a lista de utilizadores como resposta
  } catch (error) {
    return res.status(400).json({ error });
  }
});

// Remover Utilizador
router.delete("/removerutilizador", isLoggedIn, async (req, res) => {
  const idutilizador = req.body.id;
  try {
    await Utilizador.deleteOne({ _id: idutilizador }); // Remove um utilizador da base de dados com base no ID fornecido
    res.send("Utilizador removido com sucesso");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

// Editar Utilizador
router.put("/editarutilizador", isLoggedIn, async (req, res) => {
  const idutilizador = req.body.id;
  const novoutilizador = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password, // Atualiza os dados do utilizador na base de dados
    pais: req.body.pais,
    cidade: req.body.cidade,
    contacto: req.body.contacto,
  };
  try {
    await Utilizador.updateOne({ _id: idutilizador }, novoutilizador);
    res.send("Utilizador editado com sucesso");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

// Ativar e Desativar Utilizador
router.patch("/statusutilizador", isLoggedIn, async (req, res) => {
  const idutilizador = req.body.id;
  try {
    const utilizador = await Utilizador.findOne({ _id: idutilizador });

    if (!utilizador) {
      return res.status(404).send("Utilizador não encontrado");
    }

    if (utilizador.ativo) {
      await Utilizador.updateOne({ _id: idutilizador }, { $set: { ativo: false } });
      res.send("Utilizador desativado com sucesso");
    } else {
      await Utilizador.updateOne({ _id: idutilizador }, { $set: { ativo: true } });
      res.send("Utilizador ativado com sucesso");
    }
  } catch (error) {
    return res.status(500).json({ error: "Erro" });
  }
});

// Ativar e Desativar Administrador
router.patch("/administrador", isLoggedIn, async (req, res) => {
  const idutilizador = req.body.id;
  try {
    const utilizador = await Utilizador.findOne({ _id: idutilizador });
    if (!utilizador) {
      return res.status(404).send("Utilizador não encontrado");
    }

    const novoStatusAdmin = !utilizador.isAdmin;

    await Utilizador.updateOne({ _id: idutilizador }, { $set: { isAdmin: novoStatusAdmin } });

    res.send(`O status 'isAdmin' foi alternado para ${novoStatusAdmin ? 'true' : 'false'}`);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro" });
  }
});

module.exports = router; // Exporta o router contendo todas as rotas relacionadas a Utilizadores
