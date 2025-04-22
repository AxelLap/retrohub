"use client";
import { useCartStore } from "@/lib/store/use-cart-store";
import { useDialogStore } from "@/lib/store/use-user-dialog-store";
import { useUserStore } from "@/lib/store/use-user-store";
import { getUser } from "@/lib/supabase/users/get-user";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CartButton } from "../buttons/CartButton";

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
        <CartButton />
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

  const userImage = userData[0].image;

  return (
    <button
      className="flex w-fit gap-2 items-center cursor-pointer"
      onClick={setIsDialogOpen}
    >
      <span>{userName}</span>

      {userImage === null ? (
        <User />
      ) : (
        <img
          src={userData[0].image}
          className="w-[60px] h-[60px] rounded-full object-cover"
        />
      )}
    </button>
  );
};
