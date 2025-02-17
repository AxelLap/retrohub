"use client";
import { ItemList } from "@/components/ItemList";
import { useUserStore } from "@/lib/store/use-user-store";
import { useRouter } from "next/navigation";
import Login from "./login/page";

import { FilterButton } from "@/components/FilterBtn";
import { CATEGORIES } from "@/lib/category-data";
import { CONSTR } from "@/lib/constructor-data";
import { useFilterStore } from "@/lib/store/use-filter-store";
import { ChevronDown } from "lucide-react";

export default function Home() {
  const userName = useUserStore((state) => state.user);
  const isAdmin = useUserStore((s) => s.isAdmin);
  const router = useRouter();
  const {
    isFiltersMenuOpen,
    toggleFilterMenu,
    setCatFilter,
    setConstrFilter,
    catFilter,
  } = useFilterStore();

  if (!userName) {
    return <Login />;
  }
  console.log(catFilter);
  return (
    <>
      <p>Welcome to the shop !</p>
      <div
        className={`bg-gray-800 w-full overflow-hidden rounded-md p-1 text-white transition-all duration-300 ${
          isFiltersMenuOpen ? "h-[250px]" : "h-[25px]"
        }`}
      >
        <div className="w-full flex h-fit">
          <span className="pl-2">Filters</span>
          <ChevronDown
            className={`ml-auto hover:cursor-pointer transition-transform duration-300 ${
              isFiltersMenuOpen ? "rotate-180" : "rotate-0"
            }`}
            onClick={toggleFilterMenu}
          />
        </div>
        <FilterList list={CATEGORIES} />
        <FilterList list={CONSTR} />
      </div>
      <ItemList />
    </>
  );
}

const FilterList = ({ list }) => {
  return (
    <div className="flex w-full gap-2">
      {list.map((f) => (
        <FilterButton filter={f} key={f.id} />
      ))}
    </div>
  );
};
