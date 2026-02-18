type BannerProps = {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
};

const Banner: React.FC<BannerProps> = ({
  title,
  subtitle,
  backgroundImage,
}) => {
  return (
    <section className="relative w-full h-[220px] flex items-center justify-center overflow-hidden bg-black">
      {backgroundImage && (
        <img
          src={backgroundImage}
          alt={title}
          className="absolute inset-0 w-full h-full object-fill"
        />
      )}

      <div className="absolute inset-0 bg-black/60 z-10" />

      <div className="relative z-20 text-center px-4 text-white">
        <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
        {subtitle && (
          <p className="mt-2 text-sm md:text-base text-gray-200">
            {subtitle}
          </p>
        )}
      </div>
    </section>

  );
};

export default Banner;
