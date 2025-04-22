"use client";
import { useCartStore } from "@/lib/store/use-cart-store";
import { useDialogStore } from "@/lib/store/use-user-dialog-store";
import { useUserStore } from "@/lib/store/use-user-store";
import { User } from "lucide-react";
import Link from "next/link";
import { Logo } from "../Logo";
import { CartButton } from "../buttons/CartButton";

export const Header = () => {
  const cartItems = useCartStore((s) => s.items);
  const itemsCount = useCartStore.getState().countItems();
  const cartPrice = useCartStore.getState().calculateCartPrice();
  const userName = useUserStore((state) => state.user);

  return (
    <header className="p-3 w-[95%] h-[90px] flex items-center justify-center gap-4 bg-gray-800 rounded-md m-auto mt-2 relative">
      <div className="h-full flex gap-2 items-center my-[5px] relative">
        <Link href="/">
          <Logo />
        </Link>
        <h1 className="text-2xl items-center relative top-[20px] right-[15px] text-center whitespace-nowrap">
          Retro Hub
        </h1>
      </div>
      <UserHeader />
      <div className="flex flex-col items-center h-full w-fit ml-auto gap-2 ">
        <span className="w-fit max-w-[150px] truncate ">{userName}</span>
        {userName ? <CartButton /> : null}
      </div>
    </header>
  );
};

const UserHeader = () => {
  const userImage = useUserStore((state) => state.userImage);

  const setIsDialogOpen = useDialogStore((state) => state.setIsDialogOpen);

  return (
    <button
      className="flex w-fit gap-2 items-center cursor-pointer absolute"
      onClick={setIsDialogOpen}
    >
      {userImage ? (
        <img
          src={userImage}
          className="w-[60px] h-[60px] rounded-full object-cover"
        />
      ) : (
        <div className="text-black bg-white w-[35px] h-[35px] rounded-full flex justify-center items-center m-1">
          <User size={28} />
        </div>
      )}
    </button>
  );
};
