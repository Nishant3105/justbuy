import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { useProductDetails } from "../../hooks/useProductDetails";
import { Navigation } from "swiper/modules";
import ProductGallery from "../../components/ProductGallery";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext"

import "swiper/css";
import "swiper/css/navigation";

const ProductDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, isError } = useProductDetails(slug ?? "");

  const { addToCart } = useCart();
  const { showToast } = useToast();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Product not found</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="relative min-w-0 max-w-full overflow-hidden">
        {data?.galleryImages?.length ? <ProductGallery images={data?.galleryImages}/> : (
          <div className="h-80 bg-gray-100 rounded-xl" />
        )}
      </div>

      <div className="relative min-w-0">
        <h1 className="text-3xl font-semibold">{data?.name}</h1>

        <p className="text-xl text-green-600 font-bold mt-2">
          ₹{data?.sellingPrice}
        </p>

        <p className="mt-4 text-gray-600">
          {data?.description}
        </p>

        <div className="mt-6 flex items-center gap-4">
          <span className="font-medium">Quantity</span>
          <input
            type="number"
            min={1}
            defaultValue={1}
            className="w-20 border rounded-md px-3 py-1"
          />
        </div>

        <button className="mt-6 w-full md:w-auto px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          onClick={(e) => {
            e.stopPropagation();
            addToCart(
              {
                slug: data?.slug ?? '',
                title: data?.name ?? '',
                image: data?.mainImage?? '',
                price: data?.sellingPrice ?? 0,
                quantity: 1,
              },
              showToast
            );
          }}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
