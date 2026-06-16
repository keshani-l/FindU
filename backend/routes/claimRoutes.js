const express = require("express");
const router = express.Router();

const {
  createClaim,
  getUserClaims
} = require("../controllers/claimController");

router.post("/", createClaim);

router.get(
  "/user/:user_id",
  getUserClaims
);

module.exports = router;