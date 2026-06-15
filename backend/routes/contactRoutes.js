const express = require("express");

const router = express.Router();

const {
  getContacts,
  addContact,
  deleteContact,
} = require(
  "../controllers/contactController"
);

const authMiddleware = require(
  "../middleware/authMiddleware"
);

router.get(
  "/",
  authMiddleware,
  getContacts
);

router.post(
  "/",
  authMiddleware,
  addContact
);

router.delete(
  "/:id",
  authMiddleware,
  deleteContact
);

module.exports = router;