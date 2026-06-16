const express = require("express");
const cors = require("cors");
const db = require("./db");

const authRoutes = require("./routes/authRoutes");
const itemRoutes = require("./routes/itemRoutes");
const claimRoutes = require("./routes/claimRoutes");

require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/claims", claimRoutes);

app.get("/", (req, res) => {
  res.send("FindU Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});