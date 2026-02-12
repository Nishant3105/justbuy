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
    <section
      className="w-full h-[220px] flex items-center justify-center text-white relative"
      style={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : undefined,
      }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative text-center px-4">
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
