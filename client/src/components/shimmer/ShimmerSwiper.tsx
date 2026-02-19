import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ShimmerProductCard } from "./Skeleton";

type Props = {
  title: string;
  categorySlug?: string;
  count?: number; // how many skeleton cards
};

const ShimmerSwiper = ({ title, categorySlug, count = 8 }: Props) => {
  return (
    <div className="p-5">
      <div className="relative mb-4">
        <h3 className="text-xl md:text-2xl font-semibold text-center">{title}</h3>
        {categorySlug && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
            {/* Placeholder for View All */}
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
          </div>
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
        {Array.from({ length: count }).map((_, i) => (
          <SwiperSlide key={i}>
            <ShimmerProductCard />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ShimmerSwiper;
