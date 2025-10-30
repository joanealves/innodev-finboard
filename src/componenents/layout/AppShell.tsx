import type { ReactNode } from "react";

export default function AppShell({ sidebar, children }: { sidebar?: ReactNode; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      {sidebar && (
        <aside className="hidden md:flex w-64 shrink-0 border-r border-border bg-sidebar text-sidebar-foreground">
          {sidebar}
        </aside>
      )}

      {/* Conteúdo */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {children}
        </div>
      </main>
    </div>
  );
}
