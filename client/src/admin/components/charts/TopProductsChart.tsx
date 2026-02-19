import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts";
import { useTopProducts } from "../../../hooks/useAnalytics";

const COLORS = [
    "#6366F1", 
    "#22C55E", 
    "#F59E0B", 
    "#EF4444", 
    "#3B82F6", 
    "#8B5CF6",
    "#EC4899", 
    "#14B8A6", 
];


const TopProductsChart = () => {
    const { data = [] } = useTopProducts();

    return (
        <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="mb-4 font-semibold">Top Products</h2>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>

                    <XAxis dataKey="name" />

                    <YAxis />

                    <Tooltip
                        contentStyle={{
                            borderRadius: "10px",
                            border: "1px solid #E5E7EB",
                        }}
                    />

                    <Bar dataKey="sold" radius={[6, 6, 0, 0]}>
                        {data.map((entry: any, index: number) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Bar>

                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TopProductsChart;
