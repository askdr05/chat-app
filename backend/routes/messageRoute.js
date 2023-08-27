const express = require("express")
const router = express.Router()
const { isAuthenticatedUser} = require("../middleware/auth")
const {
    allMessages,
    sendMessage,
  } = require("../controllers/messageController");

router.route("/messages/:chatId").get(isAuthenticatedUser, allMessages);
router.route("/newMessage").post(isAuthenticatedUser, sendMessage);

module.exports = router;