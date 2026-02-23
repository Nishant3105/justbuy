type BannerProps = {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  leftImage?: string;
  height?: string;
};

const Banner: React.FC<BannerProps> = ({
  title,
  subtitle,
  backgroundImage,
  leftImage,
  height = "220px",
}) => {
  return (
    <section className={`relative w-full flex items-center justify-center bg-black`}
      style={{ height }}>
      {backgroundImage && (
        <img
          src={backgroundImage}
          alt={title}
          className="absolute inset-0 w-full h-full object-fill"
        />
      )}

      <div className="absolute inset-0 bg-black/60 z-10" />

      {leftImage && (
        <img
          src={leftImage}
          alt="Batch"
          className="absolute -top-12 left-4 md:-top-16 md:left-12 h-[900px] md:h-56 w-auto rounded-xl shadow-2xl z-20 object-cover"
        />
      )}

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
