"use client";
import { ItemList } from "@/components/ItemList";
import { useUserStore } from "@/lib/store/use-user-store";
import { useRouter } from "next/navigation";
import Login from "./login/page";

export default function Home() {
  const userName = useUserStore((state) => state.user);
  const isAdmin = useUserStore((s) => s.isAdmin);
  const router = useRouter();

  console.log(isAdmin);

  if (!userName) {
    return <Login />;
  }
  return (
    <>
      <p>Welcome to the shop !</p>
      <ItemList />
    </>
  );
}
