const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI; 

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));


// Schema & Model
const scoreSchema = new mongoose.Schema({
    username: { type: String, required: true, match: /^[a-zA-Z]{2}\d{4}$/ },
    score: { type: Number, required: true },
  });
  
const User = mongoose.model("User", scoreSchema, "Users"); // Use "Users" as the collection name
  

// Routes
// Get top 10 scores
app.get("/scores", async (req, res) => {
    try {
      const topScores = await User.find().sort({ score: -1 }).limit(10);
      res.json(topScores);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch scores" });
    }
  });
  

// Add a new score
app.post("/scores", async (req, res) => {
    const { username, score } = req.body;
  
    try {
      const newUser = new User({ username, score });
      await newUser.save();
  
      // Remove scores beyond the top 10 if necessary
      const scores = await User.find().sort({ score: -1 });
      if (scores.length > 10) {
        const toDelete = scores.slice(10);
        await User.deleteMany({ _id: { $in: toDelete.map((s) => s._id) } });
      }
  
      res.status(201).json({ message: "Score added successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to add score" });
    }
  });
  

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
