//To check if user is logged in through JWT
var jwt = require("jsonwebtoken");
const JWT_secret = "AMber is a noob coder ";
const fetchuser = (req, res, next) => {
  const jwtToken = req.header('auth-token'); //Token grabbed using header
  if (!jwtToken) {
    res.status(401).send({ ERRORS: "Please authenticate with a valid token" });
  }

  try {
    //verify the token
    const data = jwt.verify(jwtToken, JWT_secret);
    req.user = data.user;

    next();
  } catch (error) {
    res.status(401).send({ ERRORS: "Please authenticate with a valid token" });
  }
};

module.exports = fetchuser;
