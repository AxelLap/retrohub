import { useCartStore } from "@/lib/store/use-cart-store";
import { formatPrice } from "@/lib/tools/formatPrice";
import { ShoppingBasket } from "lucide-react";
import { Button } from "../ui/button";

export const CartButton = () => {
  const cartItems = useCartStore((s) => s.items);
  const itemsCount = useCartStore.getState().countItems();
  const cartPrice = useCartStore.getState().calculateCartPrice();
  return (
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
  );
};
