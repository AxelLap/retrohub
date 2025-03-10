import { Loader } from "lucide-react";

export const AnimatedLoader = () => {
  return (
    <div className="flex flex-col gap-4 w-full h-full justify-center items-center m-10">
      <Loader size={50} className="animate-spin" />
      <span className="font-bold">Loading...</span>
    </div>
  );
};
