const router = require("express").Router();
const requireAuth = require("../middleware/auth.middleware");
const requireRole = require("../middleware/role.middleware");
const upload = require("../middleware/upload.middleware");
const { search, getByCategory,
  getBySlug, getAll, getById,
  filter, create, update,
  deleteProduct, testUpload } = require("../modules/product/product.controller");

router.get("/search", search);

router.get("/", requireAuth.protect, requireRole(["admin", "staff"]), getAll);

router.get("/filter", filter);

router.get("/slug/:slug", getBySlug);

router.get("/category/:category", getByCategory);

router.post("/", requireAuth.protect, requireRole(["admin"]),
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "galleryImages", maxCount: 10 },
  ]),
  create
);


router.patch("/:id", requireAuth.protect, requireRole(["admin"]),
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "galleryImages", maxCount: 10 },
  ]),
  update
);

router.delete("/:id", requireAuth.protect, requireRole(["admin"]), deleteProduct);

// router.post("/test-upload", testUpload);

router.get("/:id", requireAuth.protect, requireRole(["admin", "staff"]), getById);


module.exports = router;
