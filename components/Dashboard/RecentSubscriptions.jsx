import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Badge } from "./badge";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

const subscriptions = [
  {
    name: "Martin Lewis",
    role: "Ceo at Bukalapak",
    date: "4 Sep 2022",
    status: "Pending",
    avatar: "https://github.com/shadcn.png",
    statusColor: "bg-red-100 text-red-600 hover:bg-red-100"
  },
  {
    name: "Sofia Annisa",
    role: "Casual Dribbble",
    date: "3 Sep 2022",
    status: "Approved",
    avatar: "https://i.pravatar.cc/150?u=sofia",
    statusColor: "bg-green-100 text-green-600 hover:bg-green-100"
  },
  {
    name: "Shakir Ramzi",
    role: "Casual Dribbble",
    date: "2 Sep 2022",
    status: "Approved",
    avatar: "https://i.pravatar.cc/150?u=shakir",
    statusColor: "bg-green-100 text-green-600 hover:bg-green-100"
  }
];

export function RecentSubscriptions() {
  return (
    <Card className="border-none shadow-sm rounded-3xl h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold text-gray-700">Subscriptions</CardTitle>
        <Badge className="bg-blue-500 hover:bg-blue-600 h-6 w-6 flex items-center justify-center p-0 rounded-md">4</Badge>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between pt-0">
        <div className="space-y-6 mt-4">
          {subscriptions.map((sub, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                  <AvatarImage src={sub.avatar} />
                  <AvatarFallback>{sub.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-bold text-gray-800">{sub.name}</p>
                  <p className="text-[10px] text-gray-400 font-medium">{sub.role}</p>
                  <p className="text-[10px] text-gray-400 font-medium mt-1">{sub.date}</p>
                </div>
              </div>
              <Badge className={`border-none px-3 py-1 text-[10px] font-semibold ${sub.statusColor}`}>
                {sub.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
