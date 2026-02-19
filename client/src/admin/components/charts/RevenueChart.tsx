import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    Label
} from "recharts";
import { useRevenue } from "../../../hooks/useAnalytics";

const RevenueChart = () => {
    const { data = [] } = useRevenue();

    console.log("Revenue data:", data);

const chartData = data.map((item: any) => {
  const day = item._id?.day;
  const month = item._id?.month;

  if (!day || !month) {
    return {
      date: "",
      revenue: item.revenue ?? 0,
    };
  }

  const dateObj = new Date(2025, month - 1, day);

  const formattedDate = dateObj.toLocaleString("en-IN", {
    month: "short", 
    day: "numeric", 
  });

  return {
    date: formattedDate, 
    revenue: item.revenue ?? 0,
  };
});



return (
    <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="mb-4 font-semibold">Revenue</h2>

        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData} margin={{
                top: 10,
                right: 20,
                left: 10,
                bottom: 70,
            }}>

                <CartesianGrid stroke="#E5E7EB" strokeDasharray="4 4" />

                {/* X Axis with label */}
                <XAxis dataKey="date" stroke="#6B7280">
                    <Label
                        value="Date"
                        offset={-5}
                        position="insideBottom"
                        style={{ fill: "#374151", fontSize: 14, fontWeight: 500 }}
                    />
                </XAxis>

                {/* Y Axis with label */}
                <YAxis stroke="#6B7280">
                    <Label
                        value="Revenue (₹)"
                        angle={-90}
                        position="insideLeft"
                        style={{ fill: "#374151", fontSize: 14, fontWeight: 500 }}
                    />
                </YAxis>

                <Tooltip />

                <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#6366F1"
                    strokeWidth={3}
                />

            </LineChart>
        </ResponsiveContainer>

    </div>
);
};

export default RevenueChart;
