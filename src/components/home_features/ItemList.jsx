"use client";

import { useFilterStore } from "@/lib/store/use-filter-store";
import { getItems } from "@/lib/supabase/items/get-items";
import useSWR from "swr";
import { AnimatedLoader } from "../animations/AnimatedLoader";
import { CardItem } from "./CardItem";

export const ItemList = ({ userFilter, userCard }) => {
  const { catFilter, constrFilter } = useFilterStore();

  const { data, isLoading } = useSWR(
    ["/", catFilter, constrFilter, userFilter],
    async () => {
      return getItems(catFilter, constrFilter, userFilter);
    }
  );

  if (isLoading) {
    return <AnimatedLoader />;
  }

  const items = data.items;

  if (items.length === 0) {
    return (
      <div className="mt-10 shadow-lg rounded-md w-2/3 m-auto p-4">
        <span className="text-black ">No items created yet</span>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex gap-3 justify-center flex-wrap ">
      {items.map((i) => (
        <CardItem key={i.id} item={i} userCard={userCard} />
      ))}
    </div>
  );
};
