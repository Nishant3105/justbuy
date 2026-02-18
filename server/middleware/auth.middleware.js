const jwt = require("jsonwebtoken");

exports.protect = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken && !refreshToken) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  if (accessToken) {
    try {
      const decoded = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET
      );

      req.user = {
        id: decoded.id,
        role: decoded.role,
      };

      res.user = req.user;

      return next();
    } catch (err) {
      if (err.name !== "TokenExpiredError") {
        return res.status(401).json({ message: "Invalid token" });
      }
    }
  }

  if (!refreshToken) {
    return res.status(401).json({ message: "Session expired" });
  }

  try {
    const decodedRefresh = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const newAccessToken = jwt.sign(
      {
        id: decodedRefresh.id,
        role: decodedRefresh.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false, 
      maxAge: 15 * 60 * 1000,
    });

    req.user = {
      id: decodedRefresh.id,
      role: decodedRefresh.role,
    };

    res.user = req.user;

    next();
  } catch {
    return res.status(401).json({ message: "Refresh token expired" });
  }
};



// const jwt = require("jsonwebtoken");
// const User = require("../modules/user/user");

// module.exports = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) {
//       return res.status(401).json({ message: "No token provided" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id);

//     if (!user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     req.user = user; // 🔥 REQUIRED for requireRole
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };



