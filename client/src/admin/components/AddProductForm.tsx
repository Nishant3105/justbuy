import axios from "../../utils/axios";
import { useState, useEffect } from "react";
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Link from '@tiptap/extension-link';
import Heading from '@tiptap/extension-heading';
import type { Product } from "../../types/Product";
import RichTextEditor from "./RichTextEditor"

interface AddProductFormProps {
    initialData?: Product;
    onCancel: () => void;
    onSave: (updatedProduct: Product) => void;
}

type ProductFormData = Omit<
    Product,
    "mainImage" | "detailImage" | "galleryImages"
> & {
    mainImage: File | null;
    galleryImages: File[];
};

const TAX_MAP: Record<string, number> = {
    gst_0: 0,
    gst_5: 5,
    gst_12: 12,
    gst_18: 18,
};


const AddProductForm = ({ initialData, onCancel, onSave }: AddProductFormProps) => {
    const [formData, setFormData] = useState<ProductFormData>(
        initialData
            ? {
                ...initialData,
                mainImage: null,
                galleryImages: [],
            }
            : {
                _id: "",
                name: "",
                sku: "",
                slug: "",
                brand: "",
                category: "",
                subCategory: "",
                mrp: 0,
                sellingPrice: 0,
                discount: 0,
                taxClass: "",
                stockQty: 0,
                lowStockThreshold: 0,
                stockStatus: "in_stock",
                status: "active",
                visibility: "public",
                description: "",
                metaTitle: "",
                metaKeywords: "",
                metaDescription: "",
                mainImage: null,
                galleryImages: [],
                vendorId: "",
                createdBy: "",
                updatedBy: "",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            }
    );

    // Text / number / select
    const generateSlug = (text: string) =>
        text
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");

    const [slugEdited, setSlugEdited] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => {
            let updated = { ...prev };

            if (name === "slug") {
                setSlugEdited(true);
                updated.slug = generateSlug(value);
                return updated;
            }

            if (name === "name") {
                updated.name = value;
                if (!slugEdited) {
                    updated.slug = generateSlug(value);
                }
            } else if (name in updated) {
                updated[name as keyof typeof updated] = value as never;
            }

            const mrp = Number(updated.mrp) || 0;
            const discount = Number(updated.discount) || 0;
            const taxPercent =
                updated.taxClass && updated.taxClass in TAX_MAP
                    ? TAX_MAP[updated.taxClass]
                    : 0;


            if (mrp > 0) {
                const discountedPrice = mrp - (mrp * discount) / 100;
                const taxAmount = (discountedPrice * taxPercent) / 100;

                updated.sellingPrice = Number(
                    (discountedPrice + taxAmount).toFixed(2)
                );
            } else {
                updated.sellingPrice = 0;
            }

            return updated;
        });
    };

    const editor = useEditor({
        extensions: [StarterKit, Bold, Italic, Link, Heading],
        content: formData.description,
        onUpdate: ({ editor }) => {
            setFormData(prev => ({ ...prev, description: editor.getHTML() }))
        }
    })

    useEffect(() => {
        return () => editor?.destroy();
    }, [editor]);



    const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData((prev) => ({
            ...prev,
            mainImage: file,
        }));
    };

    const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        setFormData((prev) => ({
            ...prev,
            galleryImages: files,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const fd = new FormData();

            Object.entries(formData).forEach(([key, value]) => {
                if (
                    value === undefined ||
                    value === null ||
                    value === "" ||
                    key === "mainImage" ||
                    key === "galleryImages" ||
                    key === "_id"
                ) {
                    return;
                }

                fd.append(key, String(value));
            });

            if (formData.mainImage instanceof File) {
                fd.append("mainImage", formData.mainImage);
            }

            if (Array.isArray(formData.galleryImages)) {
                formData.galleryImages.forEach((file) => {
                    if (file instanceof File) {
                        fd.append("galleryImages", file);
                    }
                });
            }

            let res;

            if (formData._id) {
                res = await axios.patch(
                    `/api/product/${formData._id}`,
                    fd,
                    {
                        withCredentials: true,
                    }
                );
            } else {
                res = await axios.post(
                    "/api/product",
                    fd,
                    {
                        withCredentials: true,
                    }
                );
            }

            onSave(res.data);
        } catch (err: any) {
            console.error(err);
            alert(err?.response?.data?.message || "Failed to save product");
        }
    };

    const CATEGORY_MAP: Record<string, string[]> = {
        Grocery: ["Rice & Grains", "Pulses & Lentils"],
        Bakery: ["Breads", "Cakes & Pastries"],
        Dairy: ["Milk & Cream", "Cheese & Butter"],
        Beverages: ["Soft Drinks", "Juices"],
        Snacks: ["Chips", "Biscuits"],
        "Fruits & Vegetables": ["Fresh Fruits", "Fresh Vegetables"],
        "Meat & Seafood": ["Fresh Meat", "Seafood"],
        "Frozen Foods": ["Frozen Snacks", "Frozen Vegetables"],
        "Personal Care": ["Skin Care", "Hair Care"],
        "Household Essentials": ["Cleaning Supplies", "Laundry Care"],
    };



    return (
        <div className="flex flex-col gap-6 rounded-xl bg-white p-6 shadow-lg">
            <h2 className="text-lg font-semibold">Add / Edit Product</h2>

            <form className="space-y-6" onSubmit={handleSubmit}>

                {/* Product Identity */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Product Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="rounded-lg border px-4 py-2"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">SKU</label>
                        <input
                            type="text"
                            name="sku"
                            placeholder="SKU"
                            value={formData.sku}
                            onChange={handleChange}
                            className="rounded-lg border px-4 py-2"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Slug / URL Key</label>
                        <input
                            type="text"
                            name="slug"
                            placeholder="Slug / URL Key"
                            value={formData.slug}
                            onChange={handleChange}
                            className="rounded-lg border px-4 py-2"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Brand</label>
                        <input
                            type="text"
                            name="brand"
                            placeholder="Brand"
                            value={formData.brand}
                            onChange={handleChange}
                            className="rounded-lg border px-4 py-2"
                        />
                    </div>

                    {/* <div className="flex flex-col gap-4"> */}
                    {/* Category */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">
                            Category
                        </label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={(e) => {
                                handleChange(e);
                                setFormData((prev) => ({
                                    ...prev,
                                    subCategory: "",
                                }));
                            }}
                            className="rounded-lg border px-4 py-2 bg-white"
                        >
                            <option value="">Select Category</option>
                            {Object.keys(CATEGORY_MAP).map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">
                            Sub Category
                        </label>
                        <select
                            name="subCategory"
                            value={formData.subCategory}
                            onChange={handleChange}
                            disabled={!formData.category}
                            className="rounded-lg border px-4 py-2 bg-white disabled:bg-gray-100"
                        >
                            <option value="">Select Sub Category</option>
                            {formData.category &&
                                CATEGORY_MAP[formData.category]?.map((sub) => (
                                    <option key={sub} value={sub}>
                                        {sub}
                                    </option>
                                ))}
                        </select>
                    </div>
                    {/* </div> */}
                </div>

                {/* Pricing */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">MRP</label>
                        <input
                            type="number"
                            name="mrp"
                            placeholder="MRP"
                            value={formData.mrp}
                            onChange={handleChange}
                            className="rounded-lg border px-4 py-2"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Discount (%)</label>
                        <input
                            type="number"
                            name="discount"
                            placeholder="Discount (%)"
                            value={formData.discount}
                            onChange={handleChange}
                            className="rounded-lg border px-4 py-2"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Selling Price</label>
                        <input
                            type="number"
                            name="sellingPrice"
                            placeholder="Selling Price"
                            value={formData.sellingPrice}
                            readOnly
                            className="rounded-lg border px-4 py-2 bg-gray-100 cursor-not-allowed"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Tax Class</label>
                        <select
                            name="taxClass"
                            value={formData.taxClass}
                            onChange={handleChange}
                            className="rounded-lg border px-4 py-2"
                        >
                            <option value="">Select Tax Class</option>
                            <option value="gst_0">GST 0%</option>
                            <option value="gst_5">GST 5%</option>
                            <option value="gst_12">GST 12%</option>
                            <option value="gst_18">GST 18%</option>
                        </select>
                    </div>
                </div>

                {/* Inventory */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Stock Quantity</label>
                        <input
                            type="number"
                            name="stockQty"
                            value={formData.stockQty}
                            onChange={handleChange}
                            className="rounded-lg border px-4 py-2"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Low Stock Threshold</label>
                        <input
                            type="number"
                            name="lowStockThreshold"
                            value={formData.lowStockThreshold}
                            onChange={handleChange}
                            className="rounded-lg border px-4 py-2"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Stock Status</label>
                        <select
                            name="stockStatus"
                            value={formData.stockStatus}
                            onChange={handleChange}
                            className="rounded-lg border px-4 py-2"
                        >
                            <option value="in_stock">In Stock</option>
                            <option value="out_of_stock">Out of Stock</option>
                        </select>
                    </div>
                </div>

                {/* Status & Visibility */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="rounded-lg border px-4 py-2"
                        >
                            <option value="active">Active</option>
                            <option value="draft">Draft</option>
                            <option value="disabled">Disabled</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Visibility</label>
                        <select
                            name="visibility"
                            value={formData.visibility}
                            onChange={handleChange}
                            className="rounded-lg border px-4 py-2"
                        >
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                        </select>
                    </div>
                </div>

                {/* Main Image */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">
                        Main Image
                    </label>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            setFormData((prev) => ({
                                ...prev,
                                mainImage: file,
                            }));
                        }}
                        className="rounded-lg border px-4 py-2"
                    />

                    {/* Preview */}
                    {formData.mainImage && (
                        <img
                            src={URL.createObjectURL(formData.mainImage)}
                            alt="Main preview"
                            className="mt-2 h-32 w-32 rounded-lg object-cover"
                        />
                    )}
                </div>


                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">
                        Gallery Images
                    </label>

                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) =>
                            setFormData((prev: any) => ({
                                ...prev,
                                galleryImages: e.target.files
                                    ? Array.from(e.target.files)
                                    : [],
                            }))
                        }
                        className="rounded-lg border px-4 py-2"
                    />

                    {/* Preview */}
                    {formData.galleryImages.length > 0 && (
                        <div className="mt-2 grid grid-cols-3 gap-3">
                            {formData.galleryImages.map((file, idx) => (
                                <img
                                    key={idx}
                                    src={URL.createObjectURL(file)}
                                    alt="preview"
                                    className="h-24 w-full rounded-lg object-cover"
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Description */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700">Product Description</label>
                    <RichTextEditor
                        content={formData.description ?? ''}
                        onChange={(html) => setFormData({ ...formData, description: html })}
                    />
                </div>


                {/* SEO */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Meta Title</label>
                        <input
                            type="text"
                            name="metaTitle"
                            value={formData.metaTitle}
                            onChange={handleChange}
                            className="rounded-lg border px-4 py-2"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">Meta Keywords</label>
                        <input
                            type="text"
                            name="metaKeywords"
                            value={formData.metaKeywords}
                            onChange={handleChange}
                            className="rounded-lg border px-4 py-2"
                        />
                    </div>

                    <div className="flex flex-col gap-1 md:col-span-2">
                        <label className="text-sm font-medium text-gray-700">Meta Description</label>
                        <textarea
                            name="metaDescription"
                            value={formData.metaDescription}
                            onChange={handleChange}
                            className="rounded-lg border px-4 py-2"
                            rows={3}
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        className="rounded-lg border px-4 py-2"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="rounded-lg bg-black px-6 py-2 text-white"
                    >
                        Save Product
                    </button>
                </div>

            </form>

        </div>
    );
};

export default AddProductForm;
