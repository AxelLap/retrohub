"use client";
import { useCartStore } from "@/lib/store/use-cart-store";
import { formatPrice } from "@/lib/tools/formatPrice";
import { Info } from "lucide-react";

export const Bill = () => {
  const cartPrice = useCartStore((s) => s.calculateCartPrice());
  const shippingCosts = cartPrice >= 8000 ? 0 : 480;
  const total = cartPrice + shippingCosts;

  return (
    <>
      <span className="text-xs flex items-center gap-1  ">
        <Info size={13} />
        Shipping costs are free for purchases of over €80.
      </span>
      <div className="flex flex-col h-fit m-auto w-full border-b border-white p-3">
        <div className="flex gap-3 w-2/3 m-auto">
          <span>Cart price :</span>
          <span className="ml-auto">{formatPrice(cartPrice)}</span>
        </div>
        <div className="flex gap-3 w-2/3 m-auto">
          <span>Shipping costs :</span>
          <span className="ml-auto">{formatPrice(shippingCosts)}</span>
        </div>
      </div>
      <div className="flex w-full">
        <span>Total Price :</span>
        <span className="ml-auto">{formatPrice(total)}</span>
      </div>
    </>
  );
};
