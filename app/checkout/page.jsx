"use client";

import { AnimatedLoader } from "@/components/animations/AnimatedLoader";
import { Bill } from "@/components/features/Bill";
import { CartList } from "@/components/features/CartList";
import { OrderTicket } from "@/components/features/OrderTicket";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/use-cart-store";
import { useUserStore } from "@/lib/store/use-user-store";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Checkout() {
  const [isLoading, setIsLoading] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const cartItems = useCartStore((s) => s.items);
  const resetCart = useCartStore((s) => s.resetItems);
  const userName = useUserStore((s) => s.user);
  console.log(userName);
  const cartItemArray = Object.values(cartItems);
  const router = useRouter(); // Instancier le hook router pour la redirection

  const onSubmit = () => {
    setIsLoading(true); // Démarrer le loader

    // Simulation d'une attente de 3 secondes avant de confirmer la commande
    setTimeout(() => {
      setIsLoading(false); // Retirer le loader
      setOrderConfirmed(true); // Commande confirmée
      resetCart();
    }, 2000); // Délai de 3 secondes
  };

  const onGoHome = () => {
    setOrderConfirmed(false); // Réinitialiser l'état de la commande
    setIsLoading(false); // Réinitialiser l'état de chargement
    router.push("/"); // Rediriger vers la page d'accueil
  };

  if (isLoading) {
    return <AnimatedLoader />;
  }

  return (
    <section className="h-full w-full flex flex-col gap-4">
      {!orderConfirmed ? (
        <>
          <h2 className="m-auto">My cart</h2>
          <CartList items={cartItems} />
          <Bill />
          <Button onClick={onSubmit}>Submit & Pay</Button>
          {/* Appel à onSubmit lors du clic */}
        </>
      ) : (
        <div className="m-auto flex flex-col items-center gap-3">
          <div>
            <p className="w-3/4 m-auto text-center">
              🎉 Congrats{" "}
              <span className="font-bold text-green-500">{userName} </span>!
              Your order has been confirmed ! 💪
            </p>
            <OrderTicket itemCount={cartItemArray.length} />
          </div>
          <Button onClick={onGoHome}>Go back to homepage</Button>{" "}
          {/* Bouton pour revenir à l'accueil */}
        </div>
      )}
    </section>
  );
}
