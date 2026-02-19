import { useNavigate } from "react-router-dom";
import { Product } from "../types/Product";
import ShimmerProductGrid from "./shimmer/ShimmerProductGrid";

type Props = {
  products: Product[];
  loading?: boolean;
};

const ProductGrid: React.FC<Props> = ({ products, loading }) => {
  const navigate = useNavigate();

  if (loading) {
    return <ShimmerProductGrid count={6} />
  }

  if (!products.length) {
    return <p className="text-center">No products found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.slug}
          onClick={() => navigate(`/product/${product.slug}`)}
          className="relative cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-lg transition group"
          // relative cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-lg transition group
        >
          <img
            src={product.mainImage}
            className="h-48 max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
            alt={product.name}
          />
          <div className="p-4">
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-green-600 font-bold mt-1">
              ₹{product.sellingPrice}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
