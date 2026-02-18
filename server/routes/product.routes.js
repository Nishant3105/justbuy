const router = require("express").Router();
const Product = require("../modules/product/product.model");
const requireAuth = require("../middleware/auth.middleware");
const requireRole = require("../middleware/role.middleware");
const upload = require("../middleware/upload.middleware");


// console.log("requireAuth:", requireAuth);
// console.log("requireRole:", requireRole);
// console.log("requireRole result:", requireRole(["admin"]));

router.get("/search", async (req, res) => {
  const { q } = req.query;

  console.log("reached here..")

  if (!q || q.length < 2) {
    return res.json([]);
  }

  const products = await Product.find({
    name: { $regex: q, $options: "i" },
  })
    .select("name slug brand")
    .limit(8);

  res.json(products);
});

router.get(
  "/",
  requireAuth.protect,
  requireRole(["admin", "staff"]),
  async (req, res) => {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  }
);

router.get(
  "/:id",
  requireAuth.protect,
  requireRole(["admin", "staff"]),
  async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });
    res.json(product);
  }
);

router.get(
  "/category/:category",
  async (req, res) => {
    try {
      const { category } = req.params;
      const page = Number(req.query.page || 1);
      const limit = Number(req.query.limit || 10);
      const skip = (page - 1) * limit;

      const query = {
        category,
        status: "active",
        visibility: "public",
      };

      const [products, total] = await Promise.all([
        Product.find(query)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean(),

        Product.countDocuments(query),
      ]);

      res.json({
        data: products,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  }
);

router.get(
  "/slug/:slug",
  async (req, res) => {
    try {
      const product = await Product.findOne({
        slug: req.params.slug,
        status: "active",
      });

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json(product);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);


router.post(
  "/",
  requireAuth.protect,
  requireRole(["admin"]),
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "galleryImages", maxCount: 10 },
  ]),
  async (req, res) => {
    const { optimizeImage } = require("../utils/imageProcessor");
    const { uploadImage } = require("../utils/r2Upload");

    let mainImageUrl = null;
    let galleryUrls = [];

    if (req.files?.mainImage?.[0]) {
      const optimized = await optimizeImage(req.files.mainImage[0].buffer);

      mainImageUrl = await uploadImage({
        buffer: optimized.buffer,
        contentType: optimized.contentType,
        folder: "products/main",
      });
    }

    if (req.files?.galleryImages?.length) {
      for (const file of req.files.galleryImages) {
        const optimized = await optimizeImage(file.buffer);

        galleryUrls.push(
          await uploadImage({
            buffer: optimized.buffer,
            contentType: optimized.contentType,
            folder: "products/gallery",
          })
        );
      }
    }


    delete req.body._id

    const product = await Product.create({
      ...req.body,
      mainImage: mainImageUrl,
      galleryImages: galleryUrls,
      sold: 0,
      revenue: 0,
      lastSoldAt: null,
      createdBy: req.user.id,
    });

    res.status(201).json(product);
  }
);


router.patch(
  "/:id",
  requireAuth.protect,
  requireRole(["admin"]),
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "galleryImages", maxCount: 10 },
  ]),
  async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });

    const { optimizeImage } = require("../utils/imageProcessor");
    const { uploadImage, deleteImage } = require("../utils/r2Upload");

    if (req.files?.mainImage?.[0]) {
      if (product.mainImage) await deleteImage(product.mainImage);

      const optimized = await optimizeImage(req.files.mainImage[0].buffer);

      product.mainImage = await uploadImage({
        buffer: optimized.buffer,
        contentType: optimized.contentType,
        folder: "products/main",
      });

    }

    if (req.files?.galleryImages?.length) {
      for (const img of product.galleryImages || []) {
        await deleteImage(img);
      }

      product.galleryImages = [];

      for (const file of req.files.galleryImages) {
        const optimized = await optimizeImage(file.buffer);
        product.galleryImages.push(
          await uploadImage({
            buffer: optimized.buffer,
            contentType: "image/webp",
            folder: "products/gallery",
          })
        );
      }
    }

    const updates = { ...req.body };
    delete updates._id;
    delete updates.createdBy;

    Object.keys(updates).forEach((k) => {
      if (updates[k] !== "") {
        if (["stockQty", "sold", "revenue"].includes(k)) {
          updates[k] = Number(updates[k]);
        }
        product[k] = updates[k];
      }
    });

    await product.save();

    res.json(product);
  }
);

router.delete(
  "/:id",
  requireAuth.protect,
  requireRole(["admin"]),
  async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json("Not found");

    const { deleteImage } = require("../utils/r2Upload");

    await deleteImage(product.mainImage);
    for (const img of product.galleryImages) {
      await deleteImage(img);
    }

    await product.deleteOne();
    res.json({ message: "Deleted" });
  }
);

router.post("/test-upload", async (req, res) => {
  const fs = require("fs");

  const buffer = fs.readFileSync("test.jpg");

  const key = await uploadImage({
    buffer,
    key: `test/${Date.now()}.jpg`,
    contentType: "image/jpeg",
  });

  res.json({ key });
});





module.exports = router;
