const ProductsTable = () => {
    return (
        <div className="overflow-x-auto rounded-xl bg-white shadow">
            <table className="w-full border-collapse text-sm">
                <thead className="bg-gray-100 text-left">
                    <tr>
                        <th className="px-4 py-3">Product</th>
                        <th className="px-4 py-3">SKU</th>
                        <th className="px-4 py-3">Category</th>
                        <th className="px-4 py-3">Price</th>
                        <th className="px-4 py-3">Stock</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Visibility</th>
                        <th className="px-3 py-3">Image</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {[
                        {
                            name: "Milk 1L",
                            sku: "MILK-001",
                            category: "Dairy > Milk",
                            price: 120,
                            stock: 45,
                            status: "Active",
                            visibility: "Public",
                        },
                        {
                            name: "Bread Brown",
                            sku: "BRD-023",
                            category: "Bakery > Bread",
                            price: 60,
                            stock: 8,
                            status: "Active",
                            visibility: "Public",
                        },
                    ].map((product, index) => (
                        <tr key={index} className="border-t">
                            {/* Product Name + Brand */}
                            <td className="px-4 py-3 font-medium">{product.name}</td>

                            {/* SKU */}
                            <td className="px-4 py-3 text-gray-600">{product.sku}</td>

                            {/* Category */}
                            <td className="px-4 py-3">{product.category}</td>

                            {/* Price */}
                            <td className="px-4 py-3">₹{product.price}</td>

                            {/* Stock */}
                            <td className="px-4 py-3">
                                <span
                                    className={`rounded-full px-2 py-1 text-xs ${product.stock < 10
                                        ? "bg-red-100 text-red-700"
                                        : "bg-green-100 text-green-700"
                                        }`}
                                >
                                    {product.stock} units
                                </span>
                            </td>

                            {/* Status */}
                            <td className="px-4 py-3">
                                <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-700">
                                    {product.status}
                                </span>
                            </td>

                            {/* Visibility */}
                            <td className="px-4 py-3">
                                <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700">
                                    {product.visibility}
                                </span>
                            </td>

                            {/* Main Image */}
                            <td className="px-3 py-3">
                                <img
                                    src="/auth.jpg"
                                    alt="Product"
                                    className="h-12 w-12 rounded-md object-cover border"
                                />
                            </td>

                            {/* Actions */}
                            <td className="px-4 py-3 text-right">
                                <button className="mr-3 text-blue-600 hover:underline">
                                    Edit
                                </button>
                                <button className="text-red-600 hover:underline">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ProductsTable