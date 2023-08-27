const ErrorHandeler = require('../utils/errorHandeler')
const catchAsyncError = require('../middleware/catchAsyncError')
const Message = require("../models/messageModel")
const Chat = require("../models/chatModels")

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected
exports.allMessages = catchAsyncError(async (req, res, next) => {
  // console.log(req.params.chatId)
  const messages = await Message.find({ chat: req.params.chatId })
    .populate("sender", "name pic email")
    .populate("chat");
  // console.log(messages)
  res.status(200).json({ messages });

});

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
exports.sendMessage = catchAsyncError(async (req, res, next) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return next(new ErrorHandeler("Invalid data passed into request", 400))
  }

  const newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };


  const creatMessage = await Message.create(newMessage);

  const message = await Message.findOne({_id:creatMessage._id})
    .populate({ path: "sender", select: "name pic" })
    .populate({
      path: "chat",
      populate: {
        path: "users",
        model: "User",
        select: "name pic email"
      }
    })
  

  await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

  res.status(200).json({ message });
 
});