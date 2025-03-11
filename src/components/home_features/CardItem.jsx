"use client";

import { Card, CardFooter } from "@/components/ui/card";

import { formatPrice } from "@/lib/tools/formatPrice";
import { PenLine, Trash2, User } from "lucide-react";
import { AddToCartButton } from "../buttons/AddToCartBtn";
import { Button } from "../ui/button";

export const CardItem = ({ item, userCard }) => {
  const price = item.price;

  return (
    <Card className="w-[48%] h-[250px]">
      <div className="flex w-full h-5/6 justify-center items-center relative">
        <img
          src={item.image}
          alt={item.name}
          className=" shadow-inner w-full max-h-full object-cover rounded-t-xl"
        />
        <span className="rounded-md absolute top-1 left-1 bg-white shadow-md">
          {formatPrice(price)}
        </span>
        {userCard ? (
          <div className="w-fit flex flex-col gap-2 absolute top-1 right-1">
            <Button
              className="w-[30px] h-[30px] rounded-full "
              variant="secondary"
            >
              <PenLine />
            </Button>
            <Button
              className="w-[30px] h-[30px] rounded-full "
              variant="destructive"
            >
              <Trash2 />
            </Button>
          </div>
        ) : (
          <div className="w-fit flex flex-col top-1 right-1 gap-2 absolute">
            <AddToCartButton item={item} />
          </div>
        )}
      </div>
      <CardFooter className="flex justify-center items-center gap-2  rounded-xl p-0 h-1/6 ">
        <div className="flex h-full w-full gap-3 items-center">
          <div className="flex items-center w-full bg-transparent">
            {!item.userImage ? (
              <User
                className="absolute bottom-1 border border-black rounded-full"
                size={35}
              />
            ) : (
              <img
                src={item.userImage}
                className="relative bottom-2 rounded-full object-cover w-[55px] h-[55px]"
              />
            )}
            <span className="ml-auto mr-2 w-fit text-sm text-center">
              {item.userId || "User"}
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
