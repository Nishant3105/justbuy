type ImageCardProps = {
  title: string;
  description: string;
  image: string;
  buttonText: string;
  onClick?: () => void;
};

const ImageCard: React.FC<ImageCardProps> = ({
  title,
  description,
  image,
  buttonText,
  onClick,
}) => {
  return (
    <div className="relative h-72 rounded-xl overflow-hidden shadow-lg group cursor-pointer">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-500 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-black/40 z-10 transition-opacity duration-300 group-hover:bg-black/60" />

      <div className="relative z-20 h-full flex flex-col justify-between items-center p-4 text-white">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-gray-100 opacity-0 max-h-0 overflow-hidden transition-all duration-300 group-hover:opacity-100 group-hover:max-h-40">
          {description}
        </p>

        <div className="flex justify-center mt-2">
          <button
            className="px-6 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-200 transition"
            onClick={(e) => {
              e.stopPropagation();
              onClick && onClick();
            }}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;