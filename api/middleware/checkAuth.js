const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req?.cookies?.token;

  if (!token) {
    return next();
  }

  try {
    const data = jwt.verify(token, process.env.JWT_KEY);
    req.username = data.username;
    return next();
  } catch (err) {
    return res.status(403).json({ wiadomosc: "Błąd autoryzacji" });
  }
};
