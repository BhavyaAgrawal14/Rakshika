const SOSEvent = require("../models/SOSEvent");

const getSOSHistory = async (req, res) => {
  try {
    const events = await SOSEvent.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.json(events);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const triggerSOS = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);

    const { latitude, longitude } = req.body;
    console.log("RECEIVED COORDS:", {
      latitude,
      longitude,
    });

    const event = await SOSEvent.create({
      user: req.user.id,
      latitude: latitude || null,
      longitude: longitude || null,
    });

    console.log("SAVED EVENT:", event);

    res.status(201).json(event);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getSOSHistory,
  triggerSOS,
};
