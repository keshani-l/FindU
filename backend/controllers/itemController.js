const db = require("../db");

// Report Lost Item
exports.reportLostItem = (req, res) => {
  const {
    user_id,
    item_name,
    description,
    location
  } = req.body;

  const image = req.file ? req.file.filename : null;

  const sql = `
    INSERT INTO items
    (user_id, item_type, item_name, description, location, image)
    VALUES (?, 'lost', ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [user_id, item_name, description, location, image],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err.message
        });
      }

      res.status(201).json({
        message: "Lost item reported successfully"
      });
    }
  );
};

// Get Lost Items
exports.getLostItems = (req, res) => {
  const sql = `
    SELECT *
    FROM items
    WHERE item_type = 'lost'
    ORDER BY created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: err.message
      });
    }

    res.status(200).json(results);
  });
};

// Report Found Item
exports.reportFoundItem = (req, res) => {
  const {
    user_id,
    item_name,
    description,
    location
  } = req.body;

  const image = req.file ? req.file.filename : null;

  const sql = `
    INSERT INTO items
    (user_id, item_type, item_name, description, location, image)
    VALUES (?, 'found', ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [user_id, item_name, description, location, image],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err.message
        });
      }

      res.status(201).json({
        message: "Found item reported successfully"
      });
    }
  );
};

// Get Found Items
exports.getFoundItems = (req, res) => {
  const sql = `
    SELECT *
    FROM items
    WHERE item_type = 'found'
    ORDER BY created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: err.message
      });
    }

    res.status(200).json(results);
  });
};

// Get User Reports
exports.getUserReports = (req, res) => {
  const { user_id } = req.params;

  const sql = `
    SELECT *
    FROM items
    WHERE user_id = ?
    ORDER BY created_at DESC
  `;

  db.query(sql, [user_id], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: err.message
      });
    }

    res.status(200).json(results);
  });
};

// Delete Item
exports.deleteItem = (req, res) => {
  const { item_id } = req.params;

  const sql = "DELETE FROM items WHERE item_id = ?";

  db.query(sql, [item_id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message
      });
    }

    res.status(200).json({
      message: "Report deleted successfully"
    });
  });
};

// Update Item
exports.updateItem = (req, res) => {
  const { item_id } = req.params;
  const { item_name, description, location } = req.body;

  const sql = `
    UPDATE items
    SET item_name = ?, description = ?, location = ?
    WHERE item_id = ?
  `;

  db.query(
    sql,
    [item_name, description, location, item_id],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err.message
        });
      }

      res.status(200).json({
        message: "Report updated successfully"
      });
    }
  );
};