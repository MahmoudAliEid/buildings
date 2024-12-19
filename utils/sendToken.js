require("dotenv").config();

const sendingToken = (user, statusCode, res, message) => {
  const token = user.getAuthenticationToken();

  // Ensure cookies_expires is parsed as a number
  const cookieExpiresInDays = parseInt(process.env.cookies_expires, 10) || 30;

  // Calculate expiration date
  const expiresInMilliseconds = cookieExpiresInDays * 24 * 60 * 60 * 1000;
  const expiryDate = new Date(Date.now() + expiresInMilliseconds);

  // Validate expiration date
  if (isNaN(expiryDate.getTime())) {
    throw new Error("Invalid expiration date for the cookie");
  }

  const options = {
    httpOnly: true,
    expires: expiryDate,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    message,
    token,
    user,
  });
};

module.exports = sendingToken;
