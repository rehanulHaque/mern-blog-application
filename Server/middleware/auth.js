const jwt = require("jsonwebtoken");
const User = require("../models/userModel")

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  
  if (!authorization) {
    res.status(401).json({ error: "Authorization Token Required" });
  }
  const token = authorization.split(" ")[1];
  try {
    const {_id} = jwt.verify(token, process.env.SECRET)
    req.user = await User.findById(_id)
    next()
  } catch (error) {
    res.status(401).json({error: 'Request is not authorized'})
  }
};

module.exports = auth