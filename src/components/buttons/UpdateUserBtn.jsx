import { UserPen } from "lucide-react";
import { Button } from "../ui/button";

export const UpdateUserBtn = ({ setUserFormOpen }) => {
  return (
    <Button
      className="h-[30px] w-[30px] rounded-full absolute top-0 -right-5 shadow-md bg-white text-black hover:text-white hover:bg-black"
      onClick={() => {
        setUserFormOpen(true);
      }}
    >
      <UserPen size={12} />
    </Button>
  );
};
