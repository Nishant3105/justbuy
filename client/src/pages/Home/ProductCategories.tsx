import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext"

type Product = {
    slug: string;
    title: string;
    image: string;
    price: number;
};

type Props = {
    products: Product[];
    title: string;
    loading?: boolean;
};

const ProductCategories: React.FC<Props> = ({ products, title, loading }) => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { showToast } = useToast();

    if (loading) {
        return (
            <div>
                <h3 className="text-xl font-semibold mb-4">{title}</h3>
                <p className="text-gray-500">Loading products...</p>
            </div>
        );
    }

    if (!products.length) {
        return null; // or "No products found"
    }

    return (
        <div className="p-5">
            <h3 className="text-xl md:text-2xl font-semibold mb-6 text-center">{title}</h3>

            <Swiper
                modules={[Navigation]}
                navigation
                spaceBetween={20}
                breakpoints={{
                    320: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 4 },
                }}
            >
                {products.map((product) => (
                    <SwiperSlide key={product.slug}>
                        <div
                            onClick={() => navigate(`/product/${product.slug}`)}
                            className="relative cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-lg transition group"
                        >
                            {/* Image */}
                            <img
                                src={product.image}
                                className="h-48 max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
                                alt={product.title}
                            />

                            {/* Add to Cart Icon */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    addToCart(
                                        {
                                            slug: product.slug,
                                            title: product.title,
                                            image: product.image,
                                            price: Number(product.price),
                                            quantity: 1,
                                        },
                                        showToast
                                    );
                                }}
                                className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-black hover:text-white transition opacity-0 group-hover:opacity-100"
                                aria-label="Add to cart"
                            >
                                <FaCartPlus size={16} />
                            </button>

                            {/* Title */}
                            <div className="p-3">
                                <h3 className="font-semibold text-sm">{product.title}</h3>
                                <p className="text-green-600 font-bold mt-1">
                                    ₹{product.price}
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ProductCategories;
