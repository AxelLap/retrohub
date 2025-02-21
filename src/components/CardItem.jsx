"use client";

import { Card, CardFooter } from "@/components/ui/card";

import { formatPrice } from "@/lib/tools/formatPrice";
import { User } from "lucide-react";
import { AddToCartButton } from "./AddToCartBtn";
import { Button } from "./ui/button";

export const CardItem = ({ item }) => {
  const price = item.price;
  console.log(item.userId);
  return (
    <Card className="w-[48%] h-[250px]">
      <div className="flex w-full h-2/3 justify-center items-center relative">
        <img
          src={item.image}
          alt={item.name}
          className=" shadow-inner w-full max-h-full object-cover rounded-t-xl"
        />
        <span className="rounded-md absolute top-1 left-1 bg-white border border-black">
          {formatPrice(price)}
        </span>
      </div>
      <CardFooter className="flex justify-center items-center gap-2  rounded-xl p-0 h-1/3">
        <div className="flex h-full w-fit gap-3 items-center">
          <div className="flex flex-col items-center">
            <User className="border border-black rounded-full" size={35} />
            <span className="text-sm text-center">{item.userId || "User"}</span>
          </div>
        </div>
        <div className="w-2/3 flex flex-col gap-2">
          <Button className="w-full hover:bg-white hover:text-black m-auto">
            Description
          </Button>
          <AddToCartButton item={item} />
        </div>
      </CardFooter>
    </Card>
  );
};
