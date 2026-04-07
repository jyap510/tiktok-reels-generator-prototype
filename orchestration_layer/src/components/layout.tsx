import Nav from "./nav";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-neutral-950 text-neutral-100">
      <Nav />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
