
const { promisify } = require("util")
const jwt = require("jsonwebtoken")
const verify = promisify(jwt.verify);
const User = require("../models/user");

const adminAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization)
  const user = await verify(
    authorization,
    "gytrfdtrdjtfyuhnjinkjklsaaolkyygydssiphazemhadmin"
  ).catch((err) => {
    res.status(401).end();
  });
  if (user) {
    req.user = await User.findById(user.userId);
    next();
  }
};

const agentAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization)
  const user = await verify(
    authorization,
    "gytrfdtrdjtfyuhnjinkjklsaaolkyygydssiphazemhagent"
  ).catch((err) => {
    res.status(401).end();
  });
  if (user) {
    req.user = await User.findById(user.userId);
    next();
  }
};

const customerAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization)
  const user = await verify(
    authorization,
    "gytrfdtrdjtfyuhnjinkjklsaaolkyygydssiphazemhcustomer"
  ).catch((err) => {
    res.status(401).end();
  });
  if (user) {
    req.user = await User.findById(user.userId);
    next();
  }
};
module.exports = {
  adminAuth,
  agentAuth,
  customerAuth
};
