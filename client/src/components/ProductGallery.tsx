import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const ProductGallery = ({ images }: { images: string[] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <div className="flex gap-4 w-full max-w-full">
      {/* LEFT: Thumbnails */}
      <div className="w-24 shrink-0">
        <Swiper
          onSwiper={setThumbsSwiper}
          direction="vertical"
          spaceBetween={12}
          slidesPerView={5}
          freeMode
          watchSlidesProgress
          modules={[FreeMode, Thumbs]}
          className="h-[420px]"
        >
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="h-20 rounded-lg border hover:border-black transition cursor-pointer flex items-center justify-center">
                <img src={img} className="max-h-full object-contain" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* RIGHT: Main Image + Arrows */}
      <div className="relative flex-1 min-w-0">
        {/* Custom arrows */}
        <button className="gallery-prev absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow hover:scale-110 transition">
          <ChevronLeft size={18} />
        </button>

        <button className="gallery-next absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow hover:scale-110 transition">
          <ChevronRight size={18} />
        </button>

        <Swiper
          modules={[Navigation, Thumbs]}
          navigation={{
            prevEl: ".gallery-prev",
            nextEl: ".gallery-next",
          }}
          thumbs={{ swiper: thumbsSwiper }}
          spaceBetween={10}
          className="rounded-xl"
        >
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="h-[420px] flex items-center justify-center bg-white rounded-xl">
                <img src={img} className="max-h-full object-contain" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductGallery;
