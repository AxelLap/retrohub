"use client";

import { useCartStore } from "@/lib/store/use-cart-store";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";

export const AddToCartButton = ({ item }) => {
  const itemId = item.id;
  const cartItems = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const addItem = useCartStore((s) => s.addItem);

  if (cartItems[itemId]) {
    return (
      <Button
        className="flex flex-col w-full bg-white text-black hover:bg-white hover:text-black m-auto gap-2"
        onClick={() => {
          removeItem(item);
        }}
      >
        <Trash2 size={12} />
        Remove from cart
      </Button>
    );
  } else {
    return (
      <Button
        className="w-full hover:bg-white hover:text-black m-auto"
        onClick={() => {
          addItem(item);
        }}
      >
        Add to cart
      </Button>
    );
  }
};
