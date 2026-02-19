type ShimmerProps = {
  className?: string;
};

const Shimmer = ({ className = "" }: ShimmerProps) => {
  return (
    <div
      className={`relative overflow-hidden bg-gray-200 rounded-md ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
    </div>
  );
};

export default Shimmer;
