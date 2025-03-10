import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDialogStore } from "@/lib/store/use-user-dialog-store";
import { useUserStore } from "@/lib/store/use-user-store";
import { getUser } from "@/lib/supabase/users/get-user";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";
import { UpdateUserBtn } from "../buttons/UpdateUserBtn";
import { SignInForm } from "../forms&inputs/SignInForm";
import { Button, buttonVariants } from "../ui/button";
import { ItemList } from "./ItemList";

export const UserDialog = () => {
  const { isDialogOpen, setIsDialogOpen } = useDialogStore();
  const userData = useUserStore();
  console.log(userData);

  const [userFormOpen, setUserFormOpen] = useState(false);

  const { data } = useSWR(["/"], async () => {
    const rawData = await getUser(userData.user);
    return rawData.user[0];
  });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="h-[90%] w-[90%] rounded flex flex-col">
        <DialogHeader>
          <div className="mb-6 relative   w-fit m-auto p-2">
            <img
              className="h-[70px] w-[70px] m-auto object-cover rounded-full"
              src={userData.userImage}
            />
            <DialogTitle className="text-black">{userData.user}</DialogTitle>
            <UpdateUserBtn setUserFormOpen={setUserFormOpen} />
          </div>
          <div className="h-fit w-2/3 bg-black rounded-md m-auto p-4">
            <SignInForm defaultUser={data} setUserFormOpen={setUserFormOpen} />
          </div>
          <div className="h-[400px] overflow-scroll mb-6">
            <p className="text-black">My items</p>
            {userData?.user && (
              <ItemList userFilter={userData.user} userCard={true} />
            )}
          </div>

          <div className="flex justify-center gap-3 pt-8">
            <Link
              href="/items/new"
              onClick={() => {
                setIsDialogOpen();
              }}
              className={cn(
                buttonVariants({ variant: "default", size: "default" }),
                "hover:bg-white hover:text-black"
              )}
            >
              <span className="h-[20px] w-[20px] rounded-full text-lg border border-white flex justify-center items-center">
                +
              </span>
              Add New Item
            </Link>
          </div>
          <Button
            className="w-fit m-auto"
            onClick={() => {
              setIsDialogOpen();
              userData.logout();
            }}
          >
            log Out
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
