import ShimmerProductCard from "./ShimmerSwiper";

const ShimmerProductDetails = () => {
    return (
        <>
            <div className="max-w-6xl mx-auto p-6 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="relative min-w-0 max-w-full animate-pulse">
                        <div className="h-80 w-full bg-gray-200 rounded-xl relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                        </div>
                    </div>

                    <div className="space-y-4 animate-pulse">
                        <div className="h-10 w-3/4 bg-gray-200 rounded"></div> 
                        <div className="h-8 w-1/4 bg-gray-200 rounded mt-2"></div>
                        <div className="space-y-2">
                            <div className="h-4 w-full bg-gray-200 rounded"></div>
                            <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                            <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
                        </div>
                        <div className="h-10 w-32 bg-gray-200 rounded mt-4"></div> 
                    </div>
                </div>
            </div>
            <div>
                <div className="relative mb-4">
                    <div className="flex item-center text-center justify-center">
                        {/* <div className="h-10 w-60 bg-gray-100 rounded"></div> */}
                    </div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 text-blue-600 hover:underline font-medium">
                    </div>
                </div>
                <ShimmerProductCard title="" count={8} />
            </div>
        </>
    );
};

export default ShimmerProductDetails;
