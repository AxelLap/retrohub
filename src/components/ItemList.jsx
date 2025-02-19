"use client";

import { getItems } from "@/lib/get-items";
import { useFilterStore } from "@/lib/store/use-filter-store";
import { Loader } from "lucide-react";
import useSWR from "swr";
import { CardItem } from "./CardItem";

export const ItemList = () => {
  const { catFilter, constrFilter } = useFilterStore();
  const { data, isLoading } = useSWR(
    ["/", catFilter, constrFilter],
    async () => {
      return getItems(catFilter, constrFilter);
    }
  );

  if (isLoading) {
    return <Loader className="animate-spin" />;
  }

  const items = data.items;

  console.log(items);

  return (
    <div className="h-full w-full flex gap-3 justify-center flex-wrap ">
      {items.map((i) => (
        <CardItem key={i.id} item={i} />
      ))}
    </div>
  );
};
