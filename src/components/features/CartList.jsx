import { useCartStore } from "@/lib/store/use-cart-store";
import { formatPrice } from "@/lib/tools/formatPrice";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

export const CartList = ({ items, params }) => {
  const itemsArray = Object.values(items);

  const pathName = usePathname();

  const isCheckout = pathName === "/checkout";

  return (
    <ul
      className={cn(
        "w-full  overflow-scroll gap-2 flex flex-col",
        isCheckout
          ? "h-full max-h-[700px] border-b border-white"
          : "h-fit max-h-[200px]"
      )}
    >
      {itemsArray.map((item) => (
        <CartItem item={item} isCheckout={isCheckout} key={item.id} />
      ))}
    </ul>
  );
};

const CartItem = ({ item, isCheckout }) => {
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <li
      className={cn(
        "flex h-fit items-center m-auto w-full",
        isCheckout ? "h-fit rounded bg-white text-black p-1 gap-3" : "gap-2"
      )}
      key={item.id}
    >
      <img
        className={cn(
          "rounded-lg cover ",
          isCheckout ? "w-1/3 h-auto mr-auto" : "w-[40px] h-[40px]"
        )}
        src={item.image}
      />
      <div
        className={cn(
          "flex gap-2  justify-center items-center",
          isCheckout ? "w-full  flex-col" : "w-full mr-auto"
        )}
      >
        <span className={cn(isCheckout ? "m-auto" : "mr-auto ")}>
          {item.name}
        </span>

        <div
          className={cn(
            "flex gap-2 w-fit items-center",
            isCheckout ? "m-auto" : " ml-auto"
          )}
        >
          <span className="ml-auto">{formatPrice(item.price)}</span>
          <Button
            className="ml-auto"
            onClick={() => {
              removeItem(item);
            }}
          >
            <Trash2 />
          </Button>
        </div>
      </div>
    </li>
  );
};
