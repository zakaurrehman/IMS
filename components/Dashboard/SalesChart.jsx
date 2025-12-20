"use client";
import { Line, LineChart, ResponsiveContainer, XAxis, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

const data = [
  { name: "Jan", sales: 55, revenue: 45 },
  { name: "Feb", sales: 50, revenue: 40 },
  { name: "Mar", sales: 58, revenue: 48 },
  { name: "Apr", sales: 52, revenue: 62 },
  { name: "May", sales: 60, revenue: 45 },
  { name: "Jun", sales: 55, revenue: 48 },
];

export function SalesChart() {
  return (
    <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold text-gray-700">Sales Overview</CardTitle>
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
            <LineChart data={data}>
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#9CA3AF', fontSize: 12 }} 
                dy={10}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="#3B82F6" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#3B82F6', strokeWidth: 0 }} 
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#1E3A8A" 
                strokeWidth={3} 
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
            Total Sales
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-900"></span>
            Total Revenue
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
