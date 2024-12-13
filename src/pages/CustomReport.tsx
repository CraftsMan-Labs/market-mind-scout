import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const trendData = [
  { date: '2024-01', value: 4000 },
  { date: '2024-02', value: 3000 },
  { date: '2024-03', value: 5000 },
  { date: '2024-04', value: 2780 },
  { date: '2024-05', value: 1890 },
  { date: '2024-06', value: 2390 },
];

const insightData = [
  { metric: 'Customer Satisfaction', current: '92%', previous: '89%', trend: '+3.0%' },
  { metric: 'Market Share', current: '28%', previous: '25%', trend: '+3.0%' },
  { metric: 'Brand Awareness', current: '76%', previous: '71%', trend: '+5.0%' },
  { metric: 'Customer Retention', current: '85%', previous: '82%', trend: '+3.0%' },
];

const CustomReport = () => {
  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-white">Custom Report</h2>
      </div>

      <div className="grid gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Growth Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '6px',
                      color: '#fff'
                    }}
                  />
                  <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Key Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-400">Metric</TableHead>
                  <TableHead className="text-gray-400">Current</TableHead>
                  <TableHead className="text-gray-400">Previous</TableHead>
                  <TableHead className="text-gray-400">Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {insightData.map((row) => (
                  <TableRow key={row.metric}>
                    <TableCell className="text-white">{row.metric}</TableCell>
                    <TableCell className="text-white">{row.current}</TableCell>
                    <TableCell className="text-white">{row.previous}</TableCell>
                    <TableCell className="text-green-500">{row.trend}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomReport;