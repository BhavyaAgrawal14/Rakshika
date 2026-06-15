const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");

const app = express();
const contactRoutes = require(
  "./routes/contactRoutes"
);
connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use(
  "/api/contacts",
  contactRoutes
);

app.get("/", (req, res) => {
  res.json({
    message: "Rakshika Backend Running 🚀",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});