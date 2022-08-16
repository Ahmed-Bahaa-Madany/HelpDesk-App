const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const findOne = (id) => {
  return User.findById(id);
};

const count = () => {
  return User.aggregate([{ $group: { _id: 1, count: { $sum: 1 } } }]);
}

const find = () => {
  return User.find();
};

const create = (body) => {
  return User.create(body);
};

const delOne = (id) => {
  console.log(id)
  return User.findByIdAndDelete(id.id);
};

const login = async (body) => {
  let { userEmail, password } = body;
  const user = await User.findOne({ userEmail });
  const valid = await bcrypt.compare(password, user.password);
  const userName = user.userName;
  const userPassword = user.password;
  const userId = user._id;
  const role = user.role;
  if (!valid) {
    throw "UN_AUTH";
  } else {
    let tokenCode = "";
    if (role === "admin") {
      tokenCode = "gytrfdtrdjtfyuhnjinkjklsaaolkyygydssiphazemhadmin";
    } else if (role === "agent") {
      tokenCode = "gytrfdtrdjtfyuhnjinkjklsaaolkyygydssiphazemhagent";
    } else if (role === "customer") {
      tokenCode = "gytrfdtrdjtfyuhnjinkjklsaaolkyygydssiphazemhcustomer";
    }
    return {
      token: jwt.sign(
        {
          userEmail,
          userId: user.id,
          role: user.role
        },
        tokenCode,
        { expiresIn: "1d" }
      ),
      userEmail,
      userName,
      userId,
      userPassword,
      role
    };

  }
};

const editOne = (id, body) => {
  console.log(body)
  let password = "";
  const FChar = body.password.charAt(0);
  if (FChar === "$") {
    password = body.password;
  } else {
    const salt = bcrypt.genSaltSync(10);
    password = bcrypt.hashSync(body.password, salt);
  }
  return User.findByIdAndUpdate(id.id, {
    ...body,
    password: password
  }, { new: true });
};



module.exports = {
  findOne,
  find,
  editOne,
  delOne,
  create,
  login,
  count,
};
