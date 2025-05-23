"use client";
import { ItemList } from "@/components/features/ItemList";
import { useUserStore } from "@/lib/store/use-user-store";
import { useRouter } from "next/navigation";
import Login from "./login/page";

import { FilterButton } from "@/components/buttons/FilterBtn";
import { DeleteItemDialog } from "@/components/dialogs/DeleteItemDialog";
import { UserDialog } from "@/components/dialogs/UserDialog";
import { FooterCart } from "@/components/features/FooterCart";
import { CATEGORIES } from "@/lib/data/category-data";
import { CONSTR } from "@/lib/data/constructor-data";
import { useFilterStore } from "@/lib/store/use-filter-store";
import { useDialogStore } from "@/lib/store/use-user-dialog-store";
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

  const { isDialogOpen, isDeleteWarningOpen } = useDialogStore();

  if (!userName) {
    return <Login />;
  }

  return (
    <div className="flex flex-col gap-3 relative">
      <p className="m-auto">Welcome to the shop !</p>
      <div
        className={`flex flex-col bg-gray-800 w-full overflow-hidden rounded-md px-1 text-white transition-all duration-300 ${
          isFiltersMenuOpen ? "h-[250px]" : "h-[22px]"
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
        <div className="flex flex-col gap-4 h-[125px] mt-1">
          <FilterList list={CATEGORIES} />
          <FilterList list={CONSTR} />
        </div>
      </div>

      <ItemList />

      {isDialogOpen ? <UserDialog /> : null}
      {isDeleteWarningOpen ? <DeleteItemDialog /> : null}
      <FooterCart />
    </div>
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
