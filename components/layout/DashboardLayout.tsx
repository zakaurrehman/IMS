import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Sidebar />
      <div className="pl-64">
        <Header />
        <main className="p-6 max-w-[1600px] mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
