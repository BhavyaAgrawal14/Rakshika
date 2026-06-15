const express = require("express");

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

const router = express.Router();
const protect = require(
  "../middleware/authMiddleware"
);

router.get(
  "/profile",
  protect,
  (req, res) => {
    res.json({
      message:
        "Protected Route Access Granted ✅",
      user: req.user,
    });
  }
);

router.post(
  "/register",
  registerUser
);

router.post(
  "/login",
  loginUser
);

module.exports = router;