import { useFilterStore } from "@/lib/store/use-filter-store";

const { Button } = require("./ui/button");

export const FilterButton = ({ filter }) => {
  const { catFilter, constrFilter, setCatFilter, setConstrFilter } =
    useFilterStore();

  return (
    <>
      <Button
        className={`flex flex-col rounded-md w-[100px] h-[100px]  hover:bg-secondary hover:text-black transition-colors relative ${
          catFilter === filter.id || constrFilter === filter.id
            ? "bg-secondary text-black"
            : "bg-primary text-white"
        }`}
        onClick={() => {
          if (filter.type === "cat") {
            setCatFilter(filter.id);
          } else {
            setConstrFilter(filter.id);
          }
        }}
      >
        <div className="h-full w-full flex flex-col items-center">
          {/* <img className="h-[60px] w-[60px] object-contain" src={filter.logo} /> */}
          <span className="text-xs absolute bottom-0">{filter.name}</span>
        </div>
      </Button>
    </>
  );
};
