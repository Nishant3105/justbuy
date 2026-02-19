import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { usePaymentStatus } from "../../../hooks/useAnalytics";

const COLORS = [
  "#3B82F6", // blue
  "#10B981", // green
  "#F59E0B", // yellow
  "#EF4444", // red
  "#8B5CF6", // purple
  "#EC4899", // pink
];
const PaymentPie = () => {
    const { data = [] } = usePaymentStatus();

    const chartData = data.map((item: any) => ({
        name: item._id,
        value: item.count,
    }));

    return (
        <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="mb-4 font-semibold">Payment Status</h2>

            {/* <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={chartData} dataKey="value" nameKey="name" />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer> */}
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        label
                    >
                        {chartData.map((entry:any, index:number) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>

                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PaymentPie;
