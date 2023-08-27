const catchAsyncError = require('./catchAsyncError')
const ErrorHandeler = require('../utils/errorHandeler')
const jwt = require("jsonwebtoken");
const user = require('../models/userModels')


exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {

   const { token } = req.cookies

   if (!token) {
      return next(new ErrorHandeler("please login access the resource", 401))
   }

   const decodedData = jwt.verify(token, process.env.JWT_SECRET)
   console.log(decodedData)
   req.user = await user.findById(decodedData.id)
  
   next()
})
