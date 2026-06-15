const Contact = require("../models/Contact");

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({
      user: req.user.id,
    });

    res.json(contacts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const addContact = async (req, res) => {
  try {
    const { name, phone } = req.body;

    const contact = await Contact.create({
      user: req.user.id,
      name,
      phone,
    });

    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Contact deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getContacts,
  addContact,
  deleteContact,
};