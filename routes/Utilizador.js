const express = require("express");
const router = express.Router();
const Utilizador = require("../models/Utilizador");
const bcrypt = require("bcrypt");
const SECRET = "dsiaju32190msdkaj3012";

// registar utilizador

router.post("/registar", async (req, res) => {
  const novoutilizador = new Utilizador({
    username: req.body.username,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10),
    pais: req.body.pais,
    cidade: req.body.cidade,
    contacto: req.body.contacto,
  });

  try {
    await novoutilizador.save();
    res.send("Utilizador registado com sucesso");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

// Login

router.post("/login", async (req, res) => {
  try {
    const utilizador = await Utilizador.findOne({ email: req.body.email });
    if (utilizador) {
      const resultado = await bcrypt.compare(
        req.body.password,
        utilizador.password
      );
      if (resultado) {
        const token = await jwt.sign({ email: utilizador.email }, SECRET);
        res.json({ token });
      } else {
        res.status(400).json({ error: "As credenciais estão incorretas" });
      }
    } else {
      res.status(400).json({ error: "O utilizador não existe" });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

// mostrar todos os utilizadores

router.get("/utilizadores", async (req, res) => {
  try {
    const utilizadores = await Utilizador.find();
    res.send(utilizadores);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

// remover utilizador

router.delete("/removerutilizador", async (req, res) => {
  const idutilizador = req.body.id;
  try {
    await Utilizador.deleteOne({ _id: idutilizador });
    res.send("Utilizador removido com sucesso");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

// editar utilizador

router.put("/editarutilizador", async (req, res) => {
  const idutilizador = req.body.id;
  const novoutilizador = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
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

// Ativar e desativar utilizador

router.patch("/statusutilizador", async (req, res) => {
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


// Ativar e desativar administrador


router.patch("/administrador", async (req, res) => {
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





module.exports = router;