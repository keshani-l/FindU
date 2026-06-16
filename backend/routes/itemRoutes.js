const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  reportLostItem,
  getLostItems,
  reportFoundItem,
  getFoundItems,
  getUserReports,
  deleteItem,
  updateItem
} = require("../controllers/itemController");

router.post("/lost", upload.single("image"), reportLostItem);
router.get("/lost", getLostItems);

router.post("/found", upload.single("image"), reportFoundItem);
router.get("/found", getFoundItems);

router.get("/user/:user_id", getUserReports);
router.delete("/:item_id", deleteItem);
router.put("/:item_id", updateItem);

module.exports = router;