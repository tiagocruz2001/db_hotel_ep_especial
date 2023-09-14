const jwt = require("jsonwebtoken")

const SECRET = "dsiaju32190msdkaj3012";

const isLoggedIn = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            if (token) {
                const payload = jwt.verify(token, SECRET);
                if (payload) {
                    req.user = payload;
                    next();
                } else {
                    res.status(400).json({ error: "Verificação do token falhou" });
                }
            } else {
                res.status(400).json({ error: "malformed auth header" });
            }
        } else {
            res.status(400).json({ error: "Não tem autorização pelo token fornecido" });
        }
    } catch (error) {
        res.status(400).json({ error });
    }
}

module.exports = {
    isLoggedIn,
}