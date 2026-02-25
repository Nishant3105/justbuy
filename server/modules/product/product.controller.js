const Product = require("../product/product.model");

exports.search = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q || q.trim().length < 2) {
            return res.json([]);
        }

        const searchTerm = q.trim();

        const products = await Product.find({
            status: "active",
            visibility: "public",
            $or: [
                { name: { $regex: `^${searchTerm}`, $options: "i" } },
                { category: { $regex: `^${searchTerm}`, $options: "i" } },
                { brand: { $regex: `^${searchTerm}`, $options: "i" } },
            ],
        })
            .select("name slug brand category mainImage")
            .limit(8)
            .lean();

        res.json(products);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Search failed" });
    }
};

exports.getAll = async (req, res) => {
    const products = await Product.find()
        .select("-__v")
        .sort({ createdAt: -1 })
        .limit(100)
        .lean();
    res.json(products);
}


exports.getById = async (req, res) => {
    const product = await Product.findById(req.params.id)
        .select("_id name slug sellingPrice mainImage createdAt")
        .lean();
    if (!product) return res.status(404).json({ message: "Not found" });
    res.json(product);
}


exports.getByCategory = async (req, res) => {
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
                .select("_id name slug sellingPrice mainImage createdAt")
                // .sort({ createdAt: -1 })
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

exports.getBySlug = async (req, res) => {
    try {
        const product = await Product.findOne({
            slug: req.params.slug,
            status: "active",
        }).select("_id name slug category sellingPrice mainImage galleryImages description").lean();

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

exports.create = async (req, res) => {
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


exports.update = async (req, res) => {
    try {
        const { optimizeImage } = require("../utils/imageProcessor");
        const { uploadImage, deleteImage } = require("../utils/r2Upload");

        const productId = req.params.id;

        const existingProduct = await Product.findById(productId)
            .select("mainImage galleryImages")
            .lean();

        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        let mainImageUrl = existingProduct.mainImage;
        let galleryUrls = existingProduct.galleryImages || [];

        if (req.files?.mainImage?.[0]) {
            if (existingProduct.mainImage) {
                await deleteImage(existingProduct.mainImage);
            }

            const optimized = await optimizeImage(
                req.files.mainImage[0].buffer
            );

            mainImageUrl = await uploadImage({
                buffer: optimized.buffer,
                contentType: optimized.contentType,
                folder: "products/main",
            });
        }

        if (req.files?.galleryImages?.length) {
            if (galleryUrls.length > 0) {
                await Promise.all(
                    galleryUrls.map((img) => deleteImage(img))
                );
            }
            galleryUrls = await Promise.all(
                req.files.galleryImages.map(async (file) => {
                    const optimized = await optimizeImage(file.buffer);

                    return uploadImage({
                        buffer: optimized.buffer,
                        contentType: optimized.contentType,
                        folder: "products/gallery",
                    });
                })
            );
        }

        const updates = { ...req.body };

        delete updates._id;
        delete updates.createdBy;

        const numericFields = ["stockQty", "sold", "revenue", "price"];

        for (const field of numericFields) {
            if (updates[field] !== undefined && updates[field] !== "") {
                updates[field] = Number(updates[field]);
            }
        }

        Object.keys(updates).forEach((key) => {
            if (updates[key] === "") {
                delete updates[key];
            }
        });

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            {
                $set: {
                    ...updates,
                    mainImage: mainImageUrl,
                    galleryImages: galleryUrls,
                },
            },
            {
                new: true,
                runValidators: true,
            }
        ).lean();

        res.json(updatedProduct);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to update product",
        });
    }
};


exports.deleteProduct = async (req, res) => {
    try {
        const { deleteImage } = require("../utils/r2Upload");

        const productId = req.params.id;

        const product = await Product.findById(productId)
            .select("mainImage galleryImages")
            .lean();

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const imageDeletePromises = [];

        if (product.mainImage) {
            imageDeletePromises.push(deleteImage(product.mainImage));
        }

        if (Array.isArray(product.galleryImages) && product.galleryImages.length > 0) {
            product.galleryImages.forEach((img) => {
                imageDeletePromises.push(deleteImage(img));
            });
        }

        await Promise.allSettled(imageDeletePromises);

        await Product.findByIdAndDelete(productId);

        res.json({ message: "Product deleted successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to delete product",
        });
    }
};


exports.testUpload = async (req, res) => {
    const fs = require("fs");

    const buffer = fs.readFileSync("test.jpg");

    const key = await uploadImage({
        buffer,
        key: `test/${Date.now()}.jpg`,
        contentType: "image/jpeg",
    });

    res.json({ key });
};

exports.filter = async (req, res) => {
    try {
        let {
            page = 1,
            limit = 12,
            category,
            sortBy = "createdAt",
            order = "desc",
            search,
            minPrice,
            maxPrice,
        } = req.query;

        page = Math.max(parseInt(page) || 1, 1);
        limit = Math.min(parseInt(limit) || 12, 50);
        const skip = (page - 1) * limit;

        const allowedSortFields = ["createdAt", "price", "sold"];
        if (!allowedSortFields.includes(sortBy)) {
            sortBy = "createdAt";
        }

        const sort = {
            [sortBy]: order === "asc" ? 1 : -1,
        };

        const query = {
            status: "active",
            visibility: "public",
        };

        if (category) {
            query.category = category;
        }

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        if (search && search.length > 2) {
            query.name = {
                $regex: `^${search}`,
                $options: "i",
            };
        }

        const [products, total] = await Promise.all([
            Product.find(query)
                .select("name slug price mainImage category sold createdAt")
                .sort(sort)
                .skip(skip)
                .limit(limit)
                .lean(),

            Product.countDocuments(query),
        ]);

        res.json({
            products,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error",
        });
    }
};