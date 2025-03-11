"use client";

import { useCartStore } from "@/lib/store/use-cart-store";
import { ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

export const AddToCartButton = ({ item }) => {
  const itemId = item.id;
  const cartItems = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const addItem = useCartStore((s) => s.addItem);

  if (cartItems[itemId]) {
    return (
      <Button
        className="flex w-[30px] h-[30px] rounded-full  bg-white text-black hover:bg-white hover:text-black m-auto gap-2"
        onClick={() => {
          removeItem(item);
        }}
      >
        <Trash2 size={12} />
      </Button>
    );
  } else {
    return (
      <Button
        className="w-[30px] h-[30px] rounded-full  flex hover:bg-white hover:text-black m-auto"
        onClick={() => {
          addItem(item);
        }}
      >
        <ShoppingCart />
      </Button>
    );
  }
};
