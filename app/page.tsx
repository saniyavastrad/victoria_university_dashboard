import { AppShell } from "@/components/layout/app-shell";

export default function Home() {
  return (
    <AppShell>
      <div className="flex h-full min-h-[calc(100vh-4rem)] items-center justify-center bg-white font-sans">
        <h1 className="text-4xl font-semibold text-black">Victoria University</h1>
      </div>
    </AppShell>
  );
}
