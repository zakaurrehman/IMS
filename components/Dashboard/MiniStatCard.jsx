"use client";
import { Bar, BarChart, ResponsiveContainer } from "recharts";
import { cn } from "../../lib/utils";

export function MiniStatCard({ title, value, percentage, className, data }) {
  const isPositive = percentage.startsWith("+");

  return (
    <div
      className={cn(
        "bg-gradient-to-br from-blue-600 to-blue-900 rounded-2xl p-5 text-white flex justify-between items-end shadow-lg shadow-blue-900/20",
        className
      )}
    >
      <div className="space-y-1">
        <p className="text-blue-200 text-xs font-medium">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
        <p className={`text-xs font-medium ${isPositive ? "text-green-400" : "text-red-400"}`}>
          {percentage}
        </p>
      </div>

      <div className="h-10 w-24">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data || []}>
            <Bar
              dataKey="value"
              fill="#fff"
              radius={[2, 2, 2, 2]}
              barSize={4}
              fillOpacity={0.8}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
