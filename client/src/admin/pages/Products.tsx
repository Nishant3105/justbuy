// src/admin/pages/Products.tsx
import { useState, useEffect } from "react";
import type { Product } from "../../types/Product";
import AddProductForm from "../components/AddProductForm";
import axios from "axios";

// const initialProducts: Product[] = [
//   {
//     _id: "1",
//     name: "Milk",
//     sku: "MILK001",
//     slug: "milk",
//     brand: "DairyBest",
//     category: "Grocery",
//     subCategory: "Dairy",
//     mrp: 120,
//     sellingPrice: 100,
//     discount: 10,
//     taxClass: "gst_5",
//     stockQty: 50,
//     lowStockThreshold: 5,
//     stockStatus: "in_stock",
//     status: "active",
//     visibility: "public",
//     description: "Fresh milk from local farms",
//     metaTitle: "Buy Milk Online",
//     metaKeywords: "milk, dairy, fresh milk",
//     metaDescription: "Purchase fresh milk online from DairyBest.",
//     mainImage: "/auth.jpg",
//     detailImage: "/auth.jpg",
//     galleryImages: ["/auth.jpg", "/auth.jpg"],
//     vendorId: "V001",
//     createdBy: "admin",
//     updatedBy: "admin",
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   },
//   {
//     _id: "2",
//     name: "Bread",
//     sku: "BREAD001",
//     slug: "bread",
//     brand: "BakeHouse",
//     category: "Bakery",
//     subCategory: "Bread",
//     mrp: 50,
//     sellingPrice: 45,
//     discount: 5,
//     taxClass: "gst_5",
//     stockQty: 30,
//     lowStockThreshold: 3,
//     stockStatus: "in_stock",
//     status: "active",
//     visibility: "public",
//     description: "Freshly baked bread",
//     metaTitle: "Buy Bread Online",
//     metaKeywords: "bread, bakery, fresh bread",
//     metaDescription: "Order fresh bread online from BakeHouse.",
//     mainImage: "/auth.jpg",
//     detailImage: "/auth.jpg",
//     galleryImages: ["/auth.jpg", "/auth.jpg"],
//     vendorId: "V002",
//     createdBy: "admin",
//     updatedBy: "admin",
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   },
// ];

const Products = () => {
  // const [products, setProducts] = useState<Product[]>(initialProducts);
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  // When Cancel is clicked
  const handleCancel = () => {
    setEditingProduct(null);
    setShowForm(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "https://justbuy-a2g2.onrender.com/api/product",
          {
            withCredentials: true,
          }
        );

        setProducts(res.data || []);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };

    fetchProducts();
  }, []);


  const deleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;

    try {
      await axios.delete(
        `https://justbuy-a2g2.onrender.com/api/product/${id}`,
        { withCredentials: true }
      );

      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };


  // Edit button clicked
  const handleSave = (product: Product) => {
    if (editingProduct) {
      setProducts(products.map((p) =>
        p._id === product._id ? product : p
      ));
    } else {
      setProducts([...products, product]);
    }

    setEditingProduct(null);
    setShowForm(false);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };


  return (
    <div>
      {!showForm && (
        <>
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Products</h1>
            <button
              onClick={() => setShowForm(true)}
              className="rounded-lg bg-black px-4 py-2 text-white"
            >
              + Add Product
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl bg-white shadow">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-3 py-3">Main Image</th>
                  {/* <th className="px-3 py-3">Details Image</th> */}
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-t">
                    <td className="px-4 py-3">{product.name}</td>
                    <td className="px-4 py-3">{product.category}</td>
                    <td className="px-4 py-3">₹{product.sellingPrice}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-1 text-xs ${product.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <img src={product.mainImage} alt="Main" className="h-12 w-12 rounded-md object-cover border" />
                    </td>
                    {/* <td className="px-3 py-3">
                      {product.galleryImages.map((url) => (
                        <img key={url} src={url} className="h-12 w-12" />
                      ))}
                    </td> */}
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => handleEdit(product)} className="mr-3 text-blue-600 hover:underline">Edit</button>
                      <button
                        onClick={() => deleteProduct(product?._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {showForm && (
        <AddProductForm
          initialData={editingProduct || undefined}
          onCancel={handleCancel}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Products;
