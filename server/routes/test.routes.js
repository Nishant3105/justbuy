const express = require("express");
const User = require("../modules/user/user");

const router = express.Router();

router.get("/seed-user", async (req, res) => {
  const user = await User.create({
    firstName: "Nishant",
    lastName: "Kumar",
    email: "nishant@gmail.com",
  });

  res.json(user);
});

module.exports = router;
