import { useParams } from "react-router-dom";
import { useProductDetails } from "../../hooks/useProductDetails";
import ProductGallery from "../../components/ProductGallery";
import { useCartContext } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";
import ProductCategories from "../Home/ProductCategories";
import { useCategoryProducts } from "../../hooks/useCategoryProducts";

import "swiper/css";
import "swiper/css/navigation";
import ShimmerProductDetails from "../../components/shimmer/ShimmerProductDetails";
import { useState } from "react";
import AuthModal from "../../components/models/Auth";
import { FaCartPlus } from "react-icons/fa";

const ProductDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, isError } = useProductDetails(slug ?? "");
  const [openAuth, setOpenAuth] = useState(false);

  const { addToCart } = useCartContext();
  const { showToast } = useToast();
  const { user } = useAuth();

  const { data: grocery = [], isLoading: categoryLoading } = useCategoryProducts(data?.category || '');
  const fetchedcategory = grocery.filter((prod: any) => prod.slug !== data?.slug)

  if (isLoading) return <ShimmerProductDetails />;
  if (isError) return <div>Product not found</div>;

  return (
    <>
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="relative min-w-0 max-w-full overflow-hidden">
          {data?.galleryImages?.length ? (
            <ProductGallery images={data.galleryImages} />
          ) : (
            <div className="h-80 bg-gray-100 rounded-xl" />
          )}
        </div>

        <div className="relative min-w-0">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold">{data?.name}</h1>

            <button
              className="ml-4 px-3 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition flex items-center gap-1"
              onClick={(e) => {
                e.stopPropagation();
                if (user) {
                  addToCart(
                    {
                      productId: data?._id || "",
                      name: data?.name || "",
                      slug: data?.slug || "",
                      image: data?.mainImage || "",
                      price: data?.sellingPrice || 0,
                      quantity: 1,
                    },
                    showToast
                  );
                } else {
                  setOpenAuth(true);
                }
              }}
              aria-label="Add to cart"
            >
              <FaCartPlus size={16} />
              <span className="hidden sm:inline">Add to Cart</span>
            </button>
          </div>

          <p className="text-xl text-green-600 font-bold mt-2">
            ₹{data?.sellingPrice}
          </p>

          <p className="mt-4 text-gray-600">{data?.description}</p>
        </div>
      </div>
      <div className="space-y-8">
        <ProductCategories
          title="Suggested products"
          products={
            fetchedcategory.map((p) => ({
              _id: p._id,
              slug: p.slug,
              title: p.name,
              image: p.mainImage ?? "",
              price: p.sellingPrice
            })) || []
          }
          loading={categoryLoading}
        />
      </div>
      <AuthModal isOpen={openAuth} onClose={() => setOpenAuth(false)} />
    </>
  );
};

export default ProductDetails;
