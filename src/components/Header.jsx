"use client";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/formatPrice";
import { useCartStore } from "@/lib/store/use-cart-store";
import { useUserStore } from "@/lib/store/use-user-store";
import { ShoppingBasket, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Header = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const cartItems = useCartStore((s) => s.items);
  const itemsCount = useCartStore.getState().countItems();
  const cartPrice = useCartStore.getState().calculateCartPrice();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) return null; // Évite le rendu tant que le store n'est pas prêt

  return (
    <header className="p-3 w-[95%] h-[90px] flex items-center gap-4 bg-gray-800 rounded-md m-auto mt-2">
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
        <h1 className="text-2xl items-center">Retro Hub</h1>
      </div>
      <div className="flex h-full w-fit ml-auto gap-4 items-center">
        <UserHeader />
        <Button
          className="h-[60%] w-[60px] text-black flex flex-col p-0 gap-0 relative overflow-visible"
          variant="outline"
        >
          {itemsCount ? (
            <span className="h-[25px] w-[25px] flex justify-center items-center p-0 m-0 absolute -right-3 -top-3 bg-white rounded-full border border-black">
              {itemsCount}
            </span>
          ) : null}

          <ShoppingBasket size={18} />
          <span>{formatPrice(cartPrice)}</span>
        </Button>
      </div>
    </header>
  );
};

const UserHeader = () => {
  const userName = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  return (
    <button
      onClick={logout}
      className="flex  w-fit gap-2 items-center hover:cursor-pointer"
    >
      {userName ? <span>{userName}</span> : null}
      <User size={16} />
    </button>
  );
};
