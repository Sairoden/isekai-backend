const bcrypt = require("bcrypt");
const { User } = require("../../models/userModel.js");

exports.createUser = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User is already registered");

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    user = await User.create(req.body);

    return res.status(201).send(user);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

exports.authUser = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid password or email");

    let valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) return res.status(400).send("Invalid password or email");

    return res.status(200).send(user);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    let users = await User.find();

    return res.status(200).send(users);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
