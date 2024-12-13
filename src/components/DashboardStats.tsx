import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BarChart, Users, TrendingUp, FileText } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const data = [
  { value: 40 },
  { value: 30 },
  { value: 45 },
  { value: 25 },
  { value: 55 },
  { value: 35 },
  { value: 40 },
];

const StatCard = ({ title, value, subtitle, icon: Icon, chart = false }) => (
  <Card className="bg-gray-900 border-gray-800">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-gray-400">{title}</CardTitle>
      <Icon className="h-4 w-4 text-gray-400" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-white">{value}</div>
      <p className="text-xs text-gray-400">{subtitle}</p>
      {chart && (
        <div className="h-[80px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </CardContent>
  </Card>
);

export const DashboardStats = () => {
  return (
    <>
      <StatCard
        title="Total Outreach"
        value="12,584"
        subtitle="+20.1% from last month"
        icon={BarChart}
        chart={true}
      />
      <StatCard
        title="Active Users"
        value="89"
        subtitle="Active users today"
        icon={Users}
      />
      <StatCard
        title="Market Growth"
        value="+12.5%"
        subtitle="Increased by 4.1%"
        icon={TrendingUp}
      />
      <StatCard
        title="Reports Generated"
        value="562"
        subtitle="Last 7 days"
        icon={FileText}
      />
    </>
  );
};