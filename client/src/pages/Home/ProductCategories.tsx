import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { useCartContext } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";
import ShimmerProductCard from "../../components/shimmer/ShimmerSwiper";
import AuthModal from "../../components/models/Auth";
import { useState } from "react";

type Product = {
    _id: string,
    slug: string;
    title: string;
    image: string;
    price: number;
};

type Props = {
    products: Product[];
    title: string;
    loading?: boolean;
    categorySlug?: string;
};

const ProductCategories: React.FC<Props> = ({ products, title, loading, categorySlug }) => {
    const navigate = useNavigate();
    const { addToCart } = useCartContext();
    const { showToast } = useToast();
    const { user } = useAuth();
    const [openAuth, setOpenAuth] = useState(false);

    if (loading) {
        return (
            <div className="p-5">
                <div className="relative mb-4">
                    <h3 className="text-xl md:text-2xl font-semibold text-center">{title}</h3>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 text-blue-600 hover:underline font-medium">
                        <div className="h-4 w-20 bg-gray-200 rounded"></div>
                    </div>
                </div>
                <ShimmerProductCard title="" count={8} />
            </div>
        );
    }

    if (!products.length) {
        return null;
    }

    return (
        <div className="p-5">
            <div className="relative mb-4">
                <h3 className="text-xl md:text-2xl font-semibold text-center">{title}</h3>
                {categorySlug && (
                    <Link
                        to={`/categories/${categorySlug.toLowerCase().replace(/ & /g, "-")}`}
                        className="absolute right-0 top-1/2 -translate-y-1/2 text-blue-600 hover:underline font-medium"
                    >
                        View All
                    </Link>
                )}
            </div>

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
                            <img
                                src={product.image}
                                className="h-48 max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
                                alt={product.title}
                            />

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (user) {
                                        addToCart(
                                            {
                                                productId: product._id,
                                                name: product?.title,
                                                slug: product.slug,
                                                image: product?.image,
                                                price: product?.price,
                                                quantity: 1,
                                            },
                                            showToast
                                        );
                                    } else {
                                        setOpenAuth(true);
                                    }
                                }}
                                className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-black hover:text-white transition opacity-0 group-hover:opacity-100"
                                aria-label="Add to cart"
                            >
                                <FaCartPlus size={16} />
                            </button>

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
            <AuthModal isOpen={openAuth} onClose={() => setOpenAuth(false)} />
        </div>
    );
};

export default ProductCategories;
