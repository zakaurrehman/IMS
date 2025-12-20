import { Card, CardContent, CardHeader, CardTitle } from "./card";

const stats = [
  { label: "Subscriptions", value: "12/60", color: "bg-blue-600" },
  { label: "Pending Invoice", value: "15/90", color: "bg-blue-400" },
  { label: "Complete Projects", value: "10/30", color: "bg-blue-800" },
  { label: "Open Tickets", value: "20/40", color: "bg-sky-400" },
  { label: "Closed Tickets", value: "40/100", color: "bg-indigo-900" },
];

export function SubscriptionStats() {
  return (
    <Card className="border-none shadow-sm rounded-3xl h-full">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-gray-700">Subscriptions Statistic</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 mt-2">
        {stats.map((stat, idx) => {
          const [current, total] = stat.value.split('/').map(Number);
          const percentage = (current / total) * 100;

          return (
            <div key={idx} className="space-y-2">
              <div className="flex justify-between text-xs items-center">
                <span className="font-bold text-gray-700">{stat.label}</span>
                <span className="text-gray-500 font-medium">{stat.value}</span>
              </div>
              <div className="h-1.5 w-full bg-blue-50 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full shadow-sm ${stat.color}`} 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
