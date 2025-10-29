import type { ReactNode } from "react";
import Sidebar from "./Sidebar";

interface AppShellProps {
  readonly children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
