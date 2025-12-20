
import { cn } from "../../lib/utils";


export function StatCard({ title, value, icon: Icon, className }) {
  return (
    <div className={cn(
      "bg-primary rounded-3xl p-6 text-blue-500 flex items-center gap-4 shadow-lg shadow-blue-500/20",
      className
    )}>
      <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm shrink-0">
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div>
        <p className="text-blue-500 text-sm font-medium">{title}</p>
        <h3 className="text-3xl font-bold tracking-tight mt-0.5">{value}</h3>
      </div>
    </div>
  );
}
