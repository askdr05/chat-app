const ErrorHandeler = require('../utils/errorHandeler')
const catchAsyncError = require('../middleware/catchAsyncError')
const Notification = require("../models/notificationModel")


//@description     Get all Notification
//@route           GET /api/Notifications
//@access          Protected
exports.accessAllNotifications = catchAsyncError(async (req, res, next) => {

    const allNotifications = await Notification.find({ user: req.user._id })
    // console.log(messages)
    res.status(200).json({ allNotifications });

});

//@description     Create New Notification
//@route           POST /api/Notification
//@access          Protected
exports.sendNotification = catchAsyncError(async (req, res, next) => {

   
    const { chatId, messageId } = req.body;

    if (!chatId || !messageId) {
        console.log("Invalid data passed into request");
        return next(new ErrorHandeler("Invalid data passed into request", 400))
    }

    const newNotificationDetails = {
        user: req.user._id,
        message: messageId,
        chat: chatId,
    };


    const newNotification = await Notification.create(newNotificationDetails);

    res.status(200).json({ newNotification });

});
//@description     delete Notification
//@route           delete /api/Notification
//@access          Protected
exports.deleteNotification = catchAsyncError(async (req, res, next) => {

    const { chatId } = req.params;

    if (!chatId) {
        console.log("Invalid data passed into request");
        return next(new ErrorHandeler("Invalid data passed into request", 400))
    }

    const deletedNotification = await Notification.deleteMany({ chat: chatId });

    res.status(200).json({ success:true });

});