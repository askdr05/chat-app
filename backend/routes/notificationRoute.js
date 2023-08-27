const express = require("express")
const router = express.Router()
const { isAuthenticatedUser} = require("../middleware/auth")
const {
    accessAllNotifications,
    sendNotification,
    deleteNotification
  } = require("../controllers/notificationController");

router.route("/notifications").get( isAuthenticatedUser,accessAllNotifications);
router.route("/notifications").post(isAuthenticatedUser, sendNotification);
router.route("/notifications/:chatId").delete(isAuthenticatedUser, deleteNotification);

module.exports = router;