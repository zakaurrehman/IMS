"use client";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Complete Task", value: 186, color: "#3B82F6" },
  { name: "Inprogress Task", value: 42, color: "#60A5FA" },
  { name: "On Hold Task", value: 23, color: "#93C5FD" },
  { name: "Review Task", value: 48, color: "#1E3A8A" },
  { name: "Pending Task", value: 56, color: "#DBEAFE" },
];

export function TaskStats() {
  const totalTasks = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <Card className="border-none shadow-sm rounded-3xl h-full flex flex-col">
       <CardHeader>
        <CardTitle className="text-base font-semibold text-gray-700">Task Statistic</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col pt-0">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 bg-blue-500 rounded-full py-2 px-4 text-white text-center shadow-lg shadow-blue-500/20">
            <p className="text-xs font-bold">Total Tasks 476</p>
          </div>
          <div className="flex-1 bg-[#1E3A8A] rounded-full py-2 px-4 text-white text-center shadow-lg shadow-blue-900/20">
            <p className="text-xs font-bold">Overdue Tasks 23</p>
          </div>
        </div>
        
        <div className="h-[160px] w-full relative flex items-center justify-center mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col text-center">
                 <span className="text-[10px] text-gray-400 font-medium">Complete Task</span>
                 <span className="text-xl font-bold text-gray-800">186 Task</span>
            </div>
        </div>

        <div className="space-y-3 mt-auto">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-gray-600 font-medium">{item.name}</span>
              </div>
              <span className="font-bold text-gray-800">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
