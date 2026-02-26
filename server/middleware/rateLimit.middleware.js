const rateLimit = require("express-rate-limit");
const { ipKeyGenerator } = require("express-rate-limit");

const commonConfig = {
  standardHeaders: true,  
  legacyHeaders: false,    
  statusCode: 429,
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json({
      success: false,
      message: options.message || "Too many requests. Please try again later."
    });
  }
};

const userKeyGenerator = (req) => {
  return req.user?.id
    ? `user:${req.user.id.toString()}`
    : ipKeyGenerator(req);
};

const globalLimiter = rateLimit({
  ...commonConfig,
  windowMs: 15 * 60 * 1000,
  max: 200
});

const userLimiter = rateLimit({
  ...commonConfig,
  windowMs: 60 * 1000,
  max: 20,
  keyGenerator: userKeyGenerator
});

const loginLimiter = rateLimit({
  ...commonConfig,
  windowMs: 15 * 60 * 1000,
  max: 5,
  skipSuccessfulRequests: true, 
  message: "Too many login attempts. Please try again after 15 minutes."
});


const registerLimiter = rateLimit({
  ...commonConfig,
  windowMs: 60 * 60 * 1000,
  max: 5,
  skipSuccessfulRequests: true,
  message: "Too many registration attempts. Try again later."
});

const adminLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10, 
  keyGenerator: (req) => req.user.id
});


const searchLimiter = rateLimit({
  ...commonConfig,
  windowMs: 60 * 1000,
  max: 50,
  keyGenerator: userKeyGenerator,
  message: "Too many search requests. Slow down."
});

module.exports = {
  globalLimiter,
  userLimiter,
  loginLimiter,
  adminLimiter,
  registerLimiter,
  searchLimiter
};