// Create Token and saving in cookie

const sendToken = (userDetails, statusCode, res) => {
    const token = userDetails.getJWTToken();
  
    // options for cookie
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
  // console.log(userDetails)
    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      userDetails,
      token,
    });
  };
  
  module.exports = sendToken;