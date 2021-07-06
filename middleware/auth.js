const jwt = require("jsonwebtoken");
const config = require("config");

//middleware function
module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  //check if not token
  if (!token) {
    return res
      .status(401)
      .json({ msg: "Nessun token , autorizzazione negata" });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;

    next();
  } catch (error) {
    res.status(401).json({ msg: "Token non valido" });
  }
};
