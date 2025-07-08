const expressAsyncHandler = require("express-async-handler");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = expressAsyncHandler(async (req, res) => {
    console.log('----------req body', req.body)
  const { name, email, password, role } = req.body;
    console.log('----------req name, email, password, role ', name, email, password, role )

  if (!name || !email || !password) {
    res.status(401);
    throw new Error("please fill all details");
  }

  const vaildRole = ["user", "admin"];
  const userRole = vaildRole.includes(role) ? role : "user";

  const userexist = await User.findOne({ email });
  if (userexist) {
    res.status(400).json({message: "user already exists"});
    // throw new Error("user already exists");
  }
  //  hash password
  const hashedpassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedpassword,
    role: userRole,
  });

  if (!user) {
    res.status(400);
    throw new Error("cannot register user");
  }
  res.status(201).json({
    id: user._id,
    name: user.name,
    email: user.email,
    token: genrateToken(user._id),
  });
});
//  login user
const login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(401);
    throw new error("please fill all details");
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200);
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: genrateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("invalid credentials");
  }
});

const getme = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const genrateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};


module.exports = { register, login, getme };
