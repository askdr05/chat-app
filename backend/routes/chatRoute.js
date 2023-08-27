const express = require("express")
const router = express.Router()
const { isAuthenticatedUser} = require("../middleware/auth")
const {
    accessChat,
    fetchChats,
    createGroupChat,
    removeFromGroup,
    addToGroup,
    renameGroup,
  } = require("../controllers/chatController")

router.route("/").post(isAuthenticatedUser, accessChat);
router.route("/").get(isAuthenticatedUser, fetchChats);
router.route("/group").post(isAuthenticatedUser, createGroupChat);
router.route("/group/rename").put(isAuthenticatedUser, renameGroup);
router.route("/groupremove").put(isAuthenticatedUser, removeFromGroup);
router.route("/groupadd").put(isAuthenticatedUser, addToGroup);

module.exports = router;
