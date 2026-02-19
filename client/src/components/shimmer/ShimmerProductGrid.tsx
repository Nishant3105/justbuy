import { ShimmerProductCard } from "./Skeleton";

const ShimmerProductGrid = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ShimmerProductCard key={i} />
      ))}
    </div>
  );
};

export default ShimmerProductGrid;
