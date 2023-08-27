const express = require("express")
// const { registerUser } = require("../controllers/userControllers")
// // const { registerUser } = require("../controllers/user")

const { registerUser, 
    loginUser, 
    logOutUser, 
    forgotPassword,
    restPassword,
    getUserDetails,
    updateUserDetails,
    updatePassword,
    getAllUserDetails,

} = require("../controllers/userControllers")

const { isAuthenticatedUser} = require("../middleware/auth")
const router = express.Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/password/forget").post(forgotPassword)
router.route("/password/reset/:token").put(restPassword)
router.route("/logout").get(logOutUser)
router.route("/me").get(isAuthenticatedUser,getUserDetails)
router.route("/me/update").put(isAuthenticatedUser,updateUserDetails)
router.route("/me/update/password").put(isAuthenticatedUser,updatePassword)


router.route("/users").get(isAuthenticatedUser,getAllUserDetails)


module.exports = router