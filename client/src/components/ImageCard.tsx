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
    <div
      className="relative h-72 rounded-xl overflow-hidden shadow-lg group"
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative h-full flex flex-col justify-between p-4 text-white">
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="mt-2 text-sm text-gray-200 line-clamp-3">
            {description}
          </p>
        </div>

        <div className="flex justify-center">
          <button className="mb-2 px-6 py-2 bg-white text-black rounded-full rounded-full text-sm font-medium hover:bg-gray-200 transition" onClick={onClick}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>

  );
};

export default ImageCard;
