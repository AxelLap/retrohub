import { useFilterStore } from "@/lib/store/use-filter-store";

const { Button } = require("./ui/button");

export const FilterButton = ({ filter }) => {
  const { catFilter, constrFilter, setCatFilter, setConstrFilter } =
    useFilterStore();

  return (
    <Button
      className={`group flex flex-col rounded-md w-[100px] h-[100px] relative transition-all duration-300 ${
        catFilter === filter.id || constrFilter === filter.id
          ? " bg-secondary text-black hover:bg-secondary hover:text-black"
          : "bg-primary text-white"
      }`}
      onClick={() => {
        if (filter.type === "cat") {
          catFilter === filter.id
            ? setCatFilter(null)
            : setCatFilter(filter.id);
        } else {
          constrFilter === filter.id
            ? setConstrFilter(null)
            : setConstrFilter(filter.id);
        }
      }}
    >
      <div className="h-full w-full flex flex-col items-center">
        <img className="h-[60px] w-[60px] object-contain" src={filter.logo} />
        <span
          className="text-xs absolute bottom-1 w-full text-center 
          after:content-[''] after:block after:h-[2px] after:bg-white after:w-0 
          after:transition-all after:duration-300 group-hover:after:w-full"
        >
          {filter.name}
        </span>
      </div>
    </Button>
  );
};
