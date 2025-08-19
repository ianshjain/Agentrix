const router = require('express').Router();
const { User } = require('../models');
const ApiResponse = require('../utils/ApiResponse');
const { generateToken } = require('../utils/JWTConfig');
const constants = require('../utils/SystemConstants')
const bcrypt = require("bcrypt");

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, address, mobile, role } = req.body;

    if (!name || !email || !password || !role)
      return res.json(new ApiResponse(false, "Missing fields"));

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      mobile,
      role,
      active_status: true
    });

    res.json(new ApiResponse(true, "Registration Done"));
  } catch (err) {
    res.json(new ApiResponse(false, "Registration Failed", null, err));
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) return res.json(new ApiResponse(false, "Email Required"));
    if (!password) return res.json(new ApiResponse(false, "Password Required"));

    const user = await User.findOne({ where: { email } });
    if (!user) return res.json(new ApiResponse(false, "User not found"));

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.json(new ApiResponse(false, "Invalid Password"));

    const token = generateToken(user.id, user.role);
    res.json(new ApiResponse(true, "Login Success", {
      name: user.name,
      role: user.role,
      token
    }));
  } catch (err) {
    res.json(new ApiResponse(false, "Login Failed", null, err));
  }
});

router.get("/list", async (req, res) => {
  try {
    const { role } = req.query; 

    let users;
    if (role) {
      users = await User.findAll({ where: { role } });
    } else {
      users = await User.findAll();
    }

    res.json(new ApiResponse(true, "Users Fetched", users));
  } catch (err) {
    res.json(new ApiResponse(false, "Failed to fetch users", null, err));
  }
});

router.get("/constants",(req,res)=>{
    res.json(new ApiResponse(true,"Constants Data",constants))
})

module.exports = router;
