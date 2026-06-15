const SOSEvent = require(
  "../models/SOSEvent"
);

const getSOSHistory = async (
  req,
  res
) => {
  try {
    const events =
      await SOSEvent.find({
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

const triggerSOS = async (
  req,
  res
) => {
  try {
    const event =
      await SOSEvent.create({
        user: req.user.id,
      });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getSOSHistory,
  triggerSOS,
};