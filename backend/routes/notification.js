const express = require("express");
const notificationRouter = express.Router();
const {
  createNotification,
  getNotifications,
  getNotificationById,
  updateNotification,
  deleteNotification,
} = require("../controllers/notification");

// Create a new notification
notificationRouter.post("/", createNotification);

// Get all notifications for a specific user
notificationRouter.get("/user/:userId", getNotifications);

// Get a specific notification by ID
notificationRouter.get("/:id", getNotificationById);

// Update a notification
notificationRouter.put("/:id", updateNotification);

// Delete a notification
notificationRouter.delete("/:id", deleteNotification);

module.exports = notificationRouter;
