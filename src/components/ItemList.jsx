import { getItems } from "@/lib/get-items";
import { Loader } from "lucide-react";
import useSWR from "swr";
import { CardItem } from "./CardItem";

export const ItemList = () => {
  const { data, isLoading } = useSWR("/", async () => {
    return getItems();
  });

  if (isLoading) {
    return <Loader className="animate-spin" />;
  }

  const items = data.items;

  return (
    <div className="h-full w-full flex flex-col gap-3">
      {items.map((i) => (
        <CardItem key={i.id} item={i} />
      ))}
    </div>
  );
};
