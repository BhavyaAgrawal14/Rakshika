const express = require("express");

const router = express.Router();

const {
  getSOSHistory,
  triggerSOS,
} = require(
  "../controllers/sosController"
);

const authMiddleware = require(
  "../middleware/authMiddleware"
);

router.get(
  "/",
  authMiddleware,
  getSOSHistory
);

router.post(
  "/",
  authMiddleware,
  triggerSOS
);

module.exports = router;