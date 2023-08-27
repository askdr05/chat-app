const ErrorHandeler = require('../utils/errorHandeler')

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500
    err.message = err.message || 'internal server error'

   // mongoDb id eroor
   if(err.name==='CastError'){
    const message = `resource not found. invalid:${err.path}`
    err = new ErrorHandeler(message,400)
   }

   // mongoose duplicate key error
   if(err.code === 11000){
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
    err = new ErrorHandeler(message,400)
   }
   // json web token error
   if(err.name === "JsonWebTokenError"){
    const message = `json web token is invalid , please try again`
    err = new ErrorHandeler(message,400)
   }
   // json web toke expire error
   if(err.code === "TokenExpairedError"){
    const message = `json web token is expaired, please try again`
    err = new ErrorHandeler(message,400)
   }



    res.status(err.statusCode).json({
        success : false,
        message : err.message
})
}