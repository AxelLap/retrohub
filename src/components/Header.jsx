"use client";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/lib/store/use-user-store";
import { ShoppingBasket, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  const userName = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  return (
    <header className="p-3 w-full h-[90px] flex items-center gap-4 border-y border-white ">
      <div className="h-full flex gap-2 items-center my-[5px]">
        <Link href="/">
          <Image
            className="rounded-lg"
            src="/assets/logo.webp"
            alt="Company's logo"
            width={70}
            height={70}
          />
        </Link>
        <h1 className="text-2xl text-green-700 items-center">Retro Hub</h1>
      </div>
      <div className="flex h-full w-fit ml-auto gap-4 items-center">
        <button
          onClick={logout}
          className="flex  w-fit gap-2 items-center hover:cursor-pointer"
        >
          {userName ? <span className="text-green-700">{userName}</span> : null}
          <User size={16} />
        </button>
        <Button className="h-[30px] w-[50px] text-black" variant="outline">
          <span>0</span>
          <ShoppingBasket size={16} />
        </Button>
      </div>
    </header>
  );
};
