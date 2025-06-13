const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// SIGNUP
exports.signup = async (req, res) => {
  const { name, email, phone, vpa, password } = req.body;

  console.log("Signup request body:", req.body); // 👈 Add this
  try {
    const existingUser = await User.findOne({ $or: [{ email }, { vpa }] });
    if (existingUser) {
      console.log("Matched with existing user:", existingUser); // 👈 Add this
      return res.status(400).json({ message: "Email or VPA already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      phone,
      vpa,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};






// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // ✅ Include isAdmin in the JWT
    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin, email: user.email,name: user.name},   // 👈 Add this line
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        vpa: user.vpa,
        balance: user.balance,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

