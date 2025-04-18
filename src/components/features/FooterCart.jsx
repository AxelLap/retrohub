import { useCartStore } from "@/lib/store/use-cart-store";
import { formatPrice } from "@/lib/tools/formatPrice";
import { ChevronsDown, ChevronsUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "../../lib/utils";
import { Button, buttonVariants } from "../ui/button";
import { CartList } from "./CartList";

export const FooterCart = () => {
  const itemsCount = useCartStore.getState().countItems();
  const [isOpen, setIsOpen] = useState(false);

  const cartItems = useCartStore((s) => s.items);
  const cartPrice = useCartStore.getState().calculateCartPrice();

  const cartItemsArray = Object.values(cartItems);
  const cartIsEmpty = cartItemsArray.length === 0;

  return (
    <div className="w-full max-w-md fixed bottom-0 left-1/2 transform -translate-x-1/2">
      <div
        className={`transition-[max-height] duration-300 ease-in-out overflow-hidden bg-gray-800 rounded-lg p-2 flex flex-col items-center gap-2 ${
          isOpen ? "max-h-[500px]" : "max-h-[100px]"
        }`}
      >
        <Button
          className="w-[35px] h-[30px] rounded-xl"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {!isOpen ? <ChevronsUp /> : <ChevronsDown />}
        </Button>

        {/* Contenu affiché uniquement si ouvert */}
        {isOpen && (
          <div className="w-full flex flex-col pl-10 pr-10">
            <div className="w-full h-[50px] m-auto flex items-center">
              {cartIsEmpty ? (
                <span className="w-fit m-auto font-bold">
                  No items added to the cart yet
                </span>
              ) : (
                <>
                  <h3 className="text-white font-bold mr-auto">Cart</h3>
                  <span className="ml-auto">{formatPrice(cartPrice)}</span>
                </>
              )}
            </div>
            <CartList items={cartItems} />
          </div>
        )}
        <CheckoutLink disabled={cartIsEmpty} />
      </div>
    </div>
  );
};

const CheckoutLink = ({ disabled }) => {
  const linkStyle = cn(
    buttonVariants({ variant: "default" }),
    "w-5/6 m-auto text-white",
    disabled && "opacity-50"
  );

  return (
    <>
      {disabled ? (
        <span className={linkStyle}>Checkout</span>
      ) : (
        <Link href={"/checkout"} className={linkStyle}>
          Checkout
        </Link>
      )}
    </>
  );
};
