import { FaCartPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Product } from "../types/Product";
import { useCartContext } from "../context/CartContext";
import ShimmerProductGrid from "./shimmer/ShimmerProductGrid";
import { useToast } from "../context/ToastContext";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import AuthModal from "./models/Auth";

type Props = {
  products: Product[];
  loading?: boolean;
};

const ProductGrid: React.FC<Props> = ({ products, loading }) => {
  const navigate = useNavigate();
  const { addToCart } = useCartContext();
  const { showToast } = useToast();
  const { user } = useAuth();
  const [openAuth, setOpenAuth] = useState(false);

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
          className="relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition group"
        >

          <img
            src={product.mainImage}
            alt={product.name}
            className="h-48 w-full object-contain transition-transform duration-500 group-hover:scale-110 cursor-pointer"
            onClick={() => navigate(`/product/${product.slug}`)}
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              if (user) {
                addToCart(
                  {
                    productId: product._id,
                    name: product?.name,
                    slug: product.slug,
                    image: product?.mainImage || '',
                    price: product?.sellingPrice,
                    quantity: 1,
                  },
                  showToast
                );
              } else {
                setOpenAuth(true);
              }
            }}
            className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-black hover:text-white transition opacity-0 group-hover:opacity-100"
            aria-label="Add to cart"
          >
            <FaCartPlus size={16} />
          </button>

          <div className="p-4 cursor-pointer" onClick={() => navigate(`/product/${product.slug}`)}>
            <h3 className="font-semibold text-sm md:text-base">{product.name}</h3>
            <p className="text-green-600 font-bold mt-1">₹{product.sellingPrice}</p>
          </div>
        </div>
      ))}
      <AuthModal isOpen={openAuth} onClose={() => setOpenAuth(false)} />
    </div>
  );
};

export default ProductGrid;
