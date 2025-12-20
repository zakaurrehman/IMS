
import { AppSidebar } from "./AppSidebar";
import { Header } from "./Header";



export function DashboardLayout({ children }) {

  return (
    <div className="min-h-screen bg-background font-sans">
      <AppSidebar />
      <div className="pl-64">
        <Header />
        <main className="p-6 max-w-[1600px] mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
