import { Card, CardContent, CardHeader, CardTitle } from "@components/card";
import { Avatar, AvatarFallback, AvatarImage } from "@components/avatar";
import { Badge } from "@components/badge";

export function SubscriptionList() {
  return (
    <Card className="border-none shadow-sm rounded-3xl h-full">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-gray-700">Subscriptions Statistic</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-semibold text-gray-700">Subscriptions</span>
            <span className="text-gray-500">12/60</span>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 w-[20%] rounded-full"></div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-semibold text-gray-700">Pending Invoice</span>
            <span className="text-gray-500">15/90</span>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
             <div className="h-full bg-blue-400 w-[16%] rounded-full"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function TaskStats() {
  return (
    <Card className="border-none shadow-sm rounded-3xl h-full">
       <CardHeader>
        <CardTitle className="text-base font-semibold text-gray-700">Task Statistic</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="flex-1 bg-blue-500 rounded-xl p-3 text-white text-center">
            <p className="text-xs text-blue-100">Total Tasks</p>
            <p className="text-xl font-bold">85</p>
          </div>
          <div className="flex-1 bg-blue-700 rounded-xl p-3 text-white text-center">
            <p className="text-xs text-blue-200">Overdue Tasks</p>
            <p className="text-xl font-bold">23</p>
          </div>
        </div>
        {/* Placeholder for donut chart visualization */}
        <div className="h-24 w-full mt-4 relative flex items-center justify-center">
            <div className="w-24 h-24 rounded-full border-8 border-blue-100 border-t-blue-600 border-r-blue-600 rotate-45"></div>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
                 <span className="text-lg font-bold text-gray-700">65%</span>
                 <span className="text-[10px] text-gray-400">Completed</span>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ProfileCard() {
  return (
    <Card className="border-none shadow-sm rounded-3xl h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold text-gray-700">Subscriptions</CardTitle>
        <Badge className="bg-blue-500 hover:bg-blue-600">4</Badge>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3 mt-2">
            <Avatar className="h-10 w-10">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>ML</AvatarFallback>
            </Avatar>
            <div>
                <p className="text-sm font-bold text-gray-800">Martin Lewis</p>
                <p className="text-xs text-gray-500">Ceo at Bukalapak</p>
            </div>
        </div>
        
        <div className="mt-6 flex items-center justify-between">
            <div>
                 <p className="text-sm font-bold text-gray-800">4 Sep 2022</p>
                 <p className="text-xs text-gray-400">Due date</p>
            </div>
             <Badge variant="secondary" className="bg-red-100 text-red-600 hover:bg-red-200">Pending</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
