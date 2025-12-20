import { Card, CardContent, CardHeader, CardTitle } from ".//card";
import { Avatar, AvatarFallback, AvatarImage } from ".//avatar";
import { Badge } from ".//badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from ".//select";
import { Trash2, PenSquare } from "lucide-react";

const clients = [
  {
    id: 1,
    name: "Martin Lewis",
    email: "martinlewis@gmail.com",
    paymentType: "Paypal",
    paidDate: "17.08.2022",
    paidTime: "10:00 AM",
    amount: "$310",
    status: "Inactive",
    avatar: "https://github.com/shadcn.png"
  },
  {
    id: 2,
    name: "Sofia Annisa",
    email: "annisawohoo@gmail.com",
    paymentType: "Paypal",
    paidDate: "16.08.2022",
    paidTime: "10:00 AM",
    amount: "$210",
    status: "Active",
    avatar: "https://i.pravatar.cc/150?u=sofia"
  },
  {
    id: 3,
    name: "Shakir Ramzi",
    email: "shakirrmz@gmail.com",
    paymentType: "Paypal",
    paidDate: "15.08.2022",
    paidTime: "10:00 AM",
    amount: "$310",
    status: "Inactive",
    avatar: "https://i.pravatar.cc/150?u=shakir"
  },
  {
    id: 4,
    name: "Matin Olooye",
    email: "matinolooye@gmail.com",
    paymentType: "Paypal",
    paidDate: "14.08.2022",
    paidTime: "10:00 AM",
    amount: "$310",
    status: "Active",
    avatar: "https://i.pravatar.cc/150?u=matin"
  }
];

export function ClientsPaymentTable() {
  return (
    <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-[#0F3577] text-white mt-8">
      <CardHeader className="flex flex-row items-center justify-between border-b border-blue-800/50 pb-4">
        <CardTitle className="text-lg font-bold">Clients Payment</CardTitle>
        <div className="flex gap-2">
           <Select defaultValue="all">
            <SelectTrigger className="w-[100px] h-8 text-xs border border-blue-400/30 bg-blue-800/30 text-white rounded-lg">
              <SelectValue placeholder="All files" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All files</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="2022">
            <SelectTrigger className="w-[80px] h-8 text-xs border border-blue-400/30 bg-blue-800/30 text-white rounded-lg">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-blue-200 uppercase bg-blue-900/20 border-b border-blue-800/50">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Payment Type</th>
                <th className="px-6 py-4 font-medium">Paid Date</th>
                <th className="px-6 py-4 font-medium">Paid Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className="border-b border-blue-800/30 hover:bg-blue-800/20 transition-colors">
                  <td className="px-6 py-4 font-medium flex items-center gap-3">
                    <Avatar className="h-8 w-8 border border-blue-400/30">
                      <AvatarImage src={client.avatar} />
                      <AvatarFallback>{client.name[0]}</AvatarFallback>
                    </Avatar>
                    {client.name}
                  </td>
                  <td className="px-6 py-4 text-blue-200">{client.email}</td>
                  <td className="px-6 py-4 text-blue-200">{client.paymentType}</td>
                  <td className="px-6 py-4 text-blue-200">
                    <div className="flex flex-col">
                      <span>{client.paidDate}</span>
                      <span className="text-[10px] opacity-70">{client.paidTime}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">{client.amount}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`h-1.5 w-1.5 rounded-full ${client.status === 'Active' ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                      <span className={client.status === 'Active' ? 'text-white' : 'text-blue-200'}>{client.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-blue-200 hover:text-white">
                         <Trash2 className="h-4 w-4" />
                       </button>
                       <button className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-blue-200 hover:text-white">
                         <PenSquare className="h-4 w-4" />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4 flex items-center justify-between text-xs text-blue-200 border-t border-blue-800/50">
            <span>Showing 1 to 4 of 20 entries</span>
            <div className="flex gap-2">
                <button className="px-2 py-1 hover:text-white">Previous</button>
                <button className="px-2 py-1 bg-white text-blue-900 rounded font-medium">1</button>
                <button className="px-2 py-1 hover:text-white">2</button>
                <button className="px-2 py-1 hover:text-white">Next</button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
