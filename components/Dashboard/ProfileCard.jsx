import { Card, CardContent, CardHeader, CardTitle } from "@components/card";
import { Avatar, AvatarFallback, AvatarImage } from "@components/avatar";
import { Badge } from "@components/badge";

export function ProfileCard() {
  return (
    <Card className="border-none shadow-sm rounded-3xl h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold text-gray-700">Subscriptions</CardTitle>
        <Badge className="bg-blue-500 hover:bg-blue-600 h-6 w-6 flex items-center justify-center p-0 rounded-md">4</Badge>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3 mt-4">
            <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>ML</AvatarFallback>
            </Avatar>
            <div>
                <p className="text-sm font-bold text-gray-800">Martin Lewis</p>
                <p className="text-xs text-gray-500 font-medium mt-0.5">Ceo at Bukalapak</p>
            </div>
        </div>
        
        <div className="mt-8 flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-100">
            <div>
                 <p className="text-sm font-bold text-gray-800">4 Sep 2022</p>
                 <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide mt-0.5">Due date</p>
            </div>
             <Badge variant="secondary" className="bg-red-50 text-red-500 hover:bg-red-100 border-none px-3 py-1 text-xs font-semibold">Pending</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
