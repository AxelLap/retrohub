"use client";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/use-cart-store";
import { useDialogStore } from "@/lib/store/use-user-dialog-store";
import { useUserStore } from "@/lib/store/use-user-store";
import { getUser } from "@/lib/supabase/users/get-user";
import { formatPrice } from "@/lib/tools/formatPrice";
import { ShoppingBasket } from "lucide-react";
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
  const [userData, setUserData] = useState(null);

  const setIsDialogOpen = useDialogStore((state) => state.setIsDialogOpen);

  useEffect(() => {
    if (!userName) return;

    const fetchUser = async () => {
      const data = await getUser(userName);
      setUserData(data.user);
    };

    fetchUser(); // 👈 On exécute la fonction une seule fois au mount
  }, [userName]); // 👈 Exécute seulement si userName change

  if (!userData) return null;
  return (
    <button
      className="flex w-fit gap-2 items-center cursor-pointer"
      onClick={setIsDialogOpen}
    >
      <span>{userName}</span>
      <img
        src={userData[0].image}
        className="w-[60px] h-[60px] rounded-full object-cover"
      />
    </button>
  );
};
