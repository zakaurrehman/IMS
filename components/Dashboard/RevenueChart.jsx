"use client";
import { Bar, BarChart, ResponsiveContainer, XAxis, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

const data = [
  { name: "Jan", income: 85, outcome: 60 },
  { name: "Feb", income: 65, outcome: 45 },
  { name: "Mar", income: 50, outcome: 35 },
  { name: "Apr", income: 65, outcome: 45 },
  { name: "May", income: 50, outcome: 35 },
  { name: "Jun", income: 85, outcome: 60 },
];

export function RevenueChart() {
  return (
    <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold text-gray-700">Total Revenue</CardTitle>
        <Select defaultValue="2022">
          <SelectTrigger className="w-[80px] h-8 text-xs border-none bg-gray-50 rounded-lg">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2022">2022</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[240px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barGap={8}>
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#9CA3AF', fontSize: 12 }} 
                dy={10}
              />
              <Tooltip 
                cursor={{ fill: 'transparent' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="income" fill="#3B82F6" radius={[4, 4, 4, 4]} barSize={12} />
              <Bar dataKey="outcome" fill="#1E3A8A" radius={[4, 4, 4, 4]} barSize={12} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
            Total Income
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-900"></span>
            Total Outcome
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
