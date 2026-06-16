const db = require("../db");

exports.createClaim = (req, res) => {
  const { item_id, user_id, proof } = req.body;

  if (!item_id || !user_id || !proof) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  const sql = `
    INSERT INTO claims (item_id, user_id, proof)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [item_id, user_id, proof], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message
      });
    }

    res.status(201).json({
      message: "Claim request submitted successfully"
    });
  });
};