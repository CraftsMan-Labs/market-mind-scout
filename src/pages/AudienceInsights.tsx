import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const audienceData = [
  { name: '18-24', value: 25, color: '#3b82f6' },
  { name: '25-34', value: 35, color: '#10b981' },
  { name: '35-44', value: 20, color: '#6366f1' },
  { name: '45+', value: 20, color: '#8b5cf6' },
];

const engagementData = [
  { platform: 'Website', visitors: '45,239', engagement: '2.3m', conversion: '3.2%' },
  { platform: 'Mobile App', visitors: '32,456', engagement: '1.8m', conversion: '4.1%' },
  { platform: 'Social Media', visitors: '28,892', engagement: '956k', conversion: '2.8%' },
  { platform: 'Email', visitors: '15,678', engagement: '445k', conversion: '5.3%' },
];

const AudienceInsights = () => {
  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-white">Audience Insights</h2>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Age Demographics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={audienceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {audienceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Platform Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-400">Platform</TableHead>
                  <TableHead className="text-gray-400">Visitors</TableHead>
                  <TableHead className="text-gray-400">Engagement</TableHead>
                  <TableHead className="text-gray-400">Conversion</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {engagementData.map((row) => (
                  <TableRow key={row.platform}>
                    <TableCell className="text-white">{row.platform}</TableCell>
                    <TableCell className="text-white">{row.visitors}</TableCell>
                    <TableCell className="text-white">{row.engagement}</TableCell>
                    <TableCell className="text-white">{row.conversion}</TableCell>
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

export default AudienceInsights;