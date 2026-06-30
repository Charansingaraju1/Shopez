require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./models/User");
const Portfolio = require("./models/Portfolio");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ShopEZ API is running",
  });
});

app.get("/products", (req, res) => {
  res.json([
    { id: 1, name: "Tata Motors", price: 700, market: "India" },
    { id: 2, name: "Reliance", price: 1450, market: "India" },
    { id: 3, name: "TCS", price: 3800, market: "India" },
    { id: 4, name: "Infosys", price: 1600, market: "India" },
    { id: 5, name: "HDFC Bank", price: 1750, market: "India" },
    { id: 6, name: "ICICI Bank", price: 1200, market: "India" },
    { id: 7, name: "SBI", price: 850, market: "India" },
    { id: 8, name: "Bharti Airtel", price: 1650, market: "India" },
    { id: 9, name: "ITC", price: 450, market: "India" },
    { id: 10, name: "L&T", price: 3600, market: "India" },

    { id: 11, name: "Apple", price: 210, market: "US" },
    { id: 12, name: "Microsoft", price: 480, market: "US" },
    { id: 13, name: "Tesla", price: 320, market: "US" },
    { id: 14, name: "NVIDIA", price: 1450, market: "US" },
    { id: 15, name: "Amazon", price: 220, market: "US" },
    { id: 16, name: "Google", price: 195, market: "US" },
    { id: 17, name: "Meta", price: 720, market: "US" },
    { id: 18, name: "Netflix", price: 1180, market: "US" },
    { id: 19, name: "AMD", price: 210, market: "US" },
    { id: 20, name: "Intel", price: 45, market: "US" }
  ]);
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.json({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "Server Error",
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid password",
      });
    }

    res.json({
      success: true,
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "Server Error",
    });
  }
});

app.post("/portfolio/add", async (req, res) => {
  try {
    const { email, stockName, price, market } = req.body;

    const stock = new Portfolio({
      email,
      stockName,
      price,
      market,
    });

    await stock.save();

    res.json({
      success: true,
      message: "Stock Added",
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "Server Error",
    });
  }
});

app.get("/portfolio/:email", async (req, res) => {
  try {
    const stocks = await Portfolio.find({
      email: req.params.email,
    });

    res.json(stocks);
  } catch (err) {
    console.log(err);
    res.json([]);
  }
});

app.delete("/portfolio/:id", async (req, res) => {
  try {
    await Portfolio.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Stock Sold",
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "Server Error",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});