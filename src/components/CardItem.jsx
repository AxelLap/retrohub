import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { formatPrice } from "@/lib/formatPrice";

import { User } from "lucide-react";
import { Button } from "./ui/button";

export const CardItem = ({ item }) => {
  return (
    <Card>
      <CardHeader className="rounded-xl space-y-0.5 p-1">
        <CardTitle className="m-auto">
          <h3 className="text-xl">{item.name}</h3>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex w-full p-1 justify-center items-center h-[200px]">
        <img
          src={item.image}
          alt={item.name}
          className="rounded-lg border shadow-inner w-2/3 max-h-full object-contain"
        />
        <div className="flex flex-col gap-2 h-full w-fit m-auto pl-1  justify-center">
          <span className="font-bold">category</span>
          <p className="pl-5">{item.category}</p>

          <span className="font-bold">constructor</span>
          <p className="pl-5">{item.constr}</p>

          <span className="font-bold">price</span>
          <span className="pl-5">{formatPrice(item.price)}</span>
        </div>
      </CardContent>
      <CardFooter className="flex  rounded-xl p-0 h-fit">
        <div className="flex h-full w-fit gap-3 m-2 items-center">
          <p>Vendor:</p>
          <div className="flex flex-col items-center">
            <User className="border border-black rounded-full" size={35} />
            <span className="text-sm">User</span>
          </div>
        </div>
        <Button className="w-1/4 hover:bg-white hover:text-black m-auto">
          Description
        </Button>
        <Button className="w-1/3 hover:bg-white hover:text-black m-auto">
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
};
