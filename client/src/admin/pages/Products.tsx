import { useState } from "react";
import DataTable from "../components/DataTable";
import { useProducts } from "../../hooks/useProducts";
import AddProductForm from "../components/AddProductForm";
import type { Product } from "../../types/Product";

const Products = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [search, setSearch] = useState("");

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  const { data, isLoading } = useProducts({
    page,
    limit: 10,
    sortBy,
    order,
    search,
  });

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setShowForm(false);
  };

  const columns = [
    {
      key: "name",
      label: "Name",
      sortable: true,
    },
    {
      key: "category",
      label: "Category",
      sortable: true,
    },
    {
      key: "sellingPrice",
      label: "Price",
      sortable: true,
      render: (row: Product) => `₹${row.sellingPrice}`,
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (row: Product) => (
        <span className="px-2 py-1 bg-green-100 text-green-700 rounded">
          {row.status}
        </span>
      ),
    },
    {
      key: "mainImage",
      label: "Image",
      render: (row: Product) => (
        <img
          src={row.mainImage}
          className="h-12 w-12 rounded-md object-cover border"
        />
      ),
    },

    {
      key: "actions",
      label: "Actions",
      render: (row: Product) => (
        <button
          onClick={() => handleEdit(row)}
          className="text-blue-600 hover:underline"
        >
          Edit
        </button>
      ),
    },
  ];

  if (showForm) {
    return (
      <AddProductForm
        initialData={editingProduct || undefined}
        onCancel={handleCancel}
        onSave={() => setShowForm(false)}
      />
    );
  }

  return (
  <>
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

        <DataTable
          columns={columns}
          data={data?.products || []}
          loading={isLoading}
          page={page}
          pages={data?.pages || 1}
          sortBy={sortBy}
          order={order}
          onPageChange={setPage}
          onSortChange={(sort, ord) => {
            setSortBy(sort);
            setOrder(ord);
          }}
        />
      </>
    )}

    {showForm && (
      <AddProductForm
        initialData={editingProduct || undefined}
        onCancel={() => setShowForm(false)}
        onSave={() => setShowForm(false)}
      />
    )}
  </>
);
};

export default Products;
