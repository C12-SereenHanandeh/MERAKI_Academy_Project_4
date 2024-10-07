const Notification = require("../models/notificationSchema");

// Create a new notification
const createNotification = async (req, res) => {
  const { userId, message, date, read } = req.body;

  try {
    const notification = new Notification({ userId, message, date, read });
    await notification.save();
    res
      .status(201)
      .json({
        success: true,
        message: "Notification created successfully",
        data: notification,
      });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to create notification",
        error: err.message,
      });
  }
};

// Get all notifications for a user
const getNotifications = async (req, res) => {
  const { userId } = req.params;

  try {
    const notifications = await Notification.find({ userId });
    res.json({
      success: true,
      message: "Notifications retrieved successfully",
      data: notifications,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to retrieve notifications",
        error: err.message,
      });
  }
};

// Get a notification by ID
const getNotificationById = async (req, res) => {
  const { id } = req.params;

  try {
    const notification = await Notification.findById(id);
    if (!notification) {
      return res
        .status(404)
        .json({ success: false, message: "Notification not found" });
    }
    res.json({
      success: true,
      message: "Notification retrieved successfully",
      data: notification,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to retrieve notification",
        error: err.message,
      });
  }
};

// Update a notification
const updateNotification = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const notification = await Notification.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!notification) {
      return res
        .status(404)
        .json({ success: false, message: "Notification not found" });
    }
    res.json({
      success: true,
      message: "Notification updated successfully",
      data: notification,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to update notification",
        error: err.message,
      });
  }
};

// Delete a notification
const deleteNotification = async (req, res) => {
  const { id } = req.params;

  try {
    const notification = await Notification.findByIdAndDelete(id);
    if (!notification) {
      return res
        .status(404)
        .json({ success: false, message: "Notification not found" });
    }
    res.json({ success: true, message: "Notification deleted successfully" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to delete notification",
        error: err.message,
      });
  }
};

module.exports = {
  createNotification,
  getNotifications,
  getNotificationById,
  updateNotification,
  deleteNotification,
};
