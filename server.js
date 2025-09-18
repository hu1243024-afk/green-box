const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.log(err));

// Example Schema: Donation
const donationSchema = new mongoose.Schema({
  studentName: String,
  itemType: String,
  quantity: Number,
  date: { type: Date, default: Date.now }
});
const Donation = mongoose.model("Donation", donationSchema);

// Routes
app.get("/", (req, res) => {
  res.send("🌱 Smart Collection Backend Running!");
});

// Add donation
app.post("/donations", async (req, res) => {
  const newDonation = new Donation(req.body);
  await newDonation.save();
  res.json({ message: "Donation saved!", donation: newDonation });
});

// Get all donations
app.get("/donations", async (req, res) => {
  const donations = await Donation.find();
  res.json(donations);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
