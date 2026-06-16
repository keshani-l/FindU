const express = require("express");
const router = express.Router();

const {
  createClaim,
  getUserClaims,
  getAllClaims,
  updateClaimStatus
} = require("../controllers/claimController");

router.get("/", getAllClaims);
router.post("/", createClaim);
router.get("/user/:user_id", getUserClaims);
router.put("/:claim_id", updateClaimStatus);

module.exports = router;