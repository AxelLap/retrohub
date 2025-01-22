"use client";
import { useUserStore } from "@/lib/store/use-user-store";
import { useRouter } from "next/navigation";
import Login from "./login/page";

export default function Home() {
  const userName = useUserStore((state) => state.user);
  const router = useRouter();

  if (!userName) {
    return <Login />;
  }
  return (
    <main className="flex flex-col gap-4 justify-center items-center font-[family-name:var(--font-geist-sans)]">
      <p>Welcome to the shop !</p>
    </main>
  );
}
