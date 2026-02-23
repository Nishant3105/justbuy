import { useState } from "react";
import ImageCard from "../../components/ImageCard";
import { useNavigate } from "react-router-dom";

const Offers = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const navigate = useNavigate();

  const openVideo = (url: string) => setVideoUrl(url);
  const closeVideo = () => setVideoUrl(null);

  return (
    <>
      <section className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ImageCard
          title="Simplify Your Daily Shopping"
          image="offer1.jpg"
          description="Get all your daily essentials delivered straight to your door – fresh, reliable, and hassle-free."
          buttonText="View"
          onClick={() => openVideo("https://www.youtube.com/embed/dQw4w9WgXcQ")}
        />
        <ImageCard
          title="Explore All Categories"
          image="OIP.webp"
          description="Discover a wide range of products across every category – from beauty and wellness to home essentials. Find everything in one place!"
          buttonText="Explore"
          onClick={() => navigate("/categories/grocery")}
        />
        <ImageCard
          title="Fresh & Organic Delivered"
          image="offer2.jpg"
          description="Experience farm-fresh produce and natural products delivered straight to your home – healthy, tasty, and convenient."
          buttonText="View"
          onClick={() => openVideo("https://www.youtube.com/embed/dQw4w9WgXcQ")}
        />
      </section>

      {videoUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm p-4"
        >
          <div className="relative w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl animate-fadeIn">
            <button
              onClick={closeVideo}
              className="absolute top-2 right-2 z-50 text-white text-3xl font-bold hover:text-red-500 transition"
            >
              &times;
            </button>

            <div className="w-full aspect-video">
              <iframe
                src={videoUrl}
                title="YouTube Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-lg border-4 border-white shadow-lg"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Offers;