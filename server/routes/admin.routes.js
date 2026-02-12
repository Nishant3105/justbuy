const router = require("express").Router();
const adminController = require("../modules/admin/admin.controller");
const {protect}=require("../middleware/auth.middleware")

router.post(
  "/users",
  auth,
  authorize("admin"),
  adminCreateUser
);

router.post(
  "/admin/users",
  authMiddleware,
  adminOnly,
  createUserByAdmin
);
