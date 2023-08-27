const ErrorHandeler = require('../utils/errorHandeler')
const catchAsyncError = require('../middleware/catchAsyncError')
const Chat = require("../models/chatModels")
const User = require('../models/userModels')


//@description     Create or fetch One to One Chat
//@route           POST /api/chat/
//@access          Protected
exports.accessChat = catchAsyncError(async (req, res, next) => {
    const { userId } = req.body;

    // console.log(userId)

    if (!userId) {
        //   console.log("UserId param not sent with request");
        return next(new ErrorHandeler("UserId param not sent with request", 400))
    }

    const isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },

        ],
    })
        .populate("users", "-password")
        .populate({
            path: "latestMessage",
            populate: {
                path: "sender",
                model: "User",
                select: "name pic email"
            }
        });

   
    if (isChat[0]) {
        res.status(200).json({ FullChat: isChat[0] });
    } else {
        const chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId],
        };


        const createdChat = await Chat.create(chatData);
        const FullChat = await Chat.findOne({ _id: createdChat._id })
            .populate(
                "users",
                "-password"
            );
        res.status(200).json({ FullChat });

    }
});

//@description     Fetch all chats for a user
//@route           GET /api/chat/
//@access          Protected
exports.fetchChats = catchAsyncError(async (req, res, next) => {

    const allChats = await Chat.find({ users: req.user._id })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .populate({
            path: "latestMessage",
            populate: {
                path: "sender",
                model: "User",

            }
        })
        .sort({ updatedAt: -1 })


    res.status(200).json({ allChats });

});

//@description     Create New Group Chat
//@route           POST /api/chat/group
//@access          Protected
exports.createGroupChat = catchAsyncError(async (req, res, next) => {
    if (!req.body.users || !req.body.name) {
        return next(new ErrorHandeler("Please Fill all the feilds", 400))
    }

    if (req.body.users < 2) {
        return next(new ErrorHandeler("More than 2 users are required to form a group chat", 400))
    }

    let users = req.body.users

    users.push(req.user);

    const groupChat = await Chat.create({
        chatName: req.body.name,
        users: users,
        isGroupChat: true,
        groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    res.status(200).json({ message: "Group Created Successfully", fullGroupChat });
});

// @desc    Rename Group
// @route   PUT /api/chat/rename
// @access  Protected
exports.renameGroup = catchAsyncError(async (req, res, next) => {
    const { chatId, chatName } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            chatName: chatName,
        },
        {
            new: true,
        }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!updatedChat) {
        return next(new ErrorHandeler("Chat Not Found", 404))
    }
    res.status(200).json({ message: "Group Name Changed Successfully", updatedChat });

});


// @desc    Remove user from Group
// @route   PUT /api/chat/groupremove
// @access  Protected
exports.removeFromGroup = catchAsyncError(async (req, res, next) => {
    const { chatId, userId } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            $pull: { users: userId },
        },
        {
            new: true,
        }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    res.status(200).json({ message: "User Removed Successfuly", updatedChat });

});

// @desc    Add user to Group / Leave
// @route   PUT /api/chat/groupadd
// @access  Protected
exports.addToGroup = catchAsyncError(async (req, res, next) => {
    const { chatId, userId } = req.body;

    // check if the requester is admin
    const theChat = await Chat.findById(chatId)
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!theChat) {
        return next(new ErrorHandeler("Chat Not Found", 404))
    }
    if (JSON.stringify(req.user._id) !== JSON.stringify(theChat.groupAdmin._id)) {
        return next(new ErrorHandeler("Only Admin Can Add Members", 404))
    }


    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            $push: { users: userId },
        },
        {
            new: true,
        }
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");


    res.status(200).json({ message: "User Added Successfuly ", updatedChat });

});