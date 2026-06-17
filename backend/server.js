const express = require("express");
const cors = require("cors");
const db = require("./db");

const authRoutes = require("./routes/authRoutes");
const itemRoutes = require("./routes/itemRoutes");
const claimRoutes = require("./routes/claimRoutes");

require("dotenv").config();

const app = express();

db.query("SHOW COLUMNS FROM items LIKE 'category'", (err, results) => {
  if (err) {
    console.log(err);
    return;
  }

  if (results.length === 0) {
    db.query(
      "ALTER TABLE items ADD COLUMN category VARCHAR(60) NOT NULL DEFAULT 'Other' AFTER item_type",
      (alterErr) => {
        if (alterErr) {
          console.log(alterErr);
        }
      }
    );
  }
});

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
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
