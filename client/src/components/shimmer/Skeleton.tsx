import Shimmer from "./Shimmer";

export const TextSkeleton = ({ lines = 3 }: { lines?: number }) => {
  return (
    <div className="space-y-2">
      {[...Array(lines)].map((_, i) => (
        <Shimmer key={i} className="h-4 w-full" />
      ))}
    </div>
  );
};

export const ShimmerProductCard = () => {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-md p-3 animate-pulse">
      <div className="h-48 w-full bg-gray-200 rounded-lg mb-3 relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
      </div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      <div className="absolute top-3 right-3 h-8 w-8 bg-gray-200 rounded-full"></div>
    </div>
  );
};

export const TableRowSkeleton = ({ cols = 5 }: { cols?: number }) => {
  return (
    <tr className="border-t">
      {[...Array(cols)].map((_, i) => (
        <td key={i} className="px-4 py-3">
          <Shimmer className="h-4 w-full" />
        </td>
      ))}
    </tr>
  );
};

export const AvatarSkeleton = () => {
  return <Shimmer className="h-10 w-10 rounded-full" />;
};

export const ImageSkeleton = () => {
  return <Shimmer className="h-40 w-full rounded-lg" />;
};
