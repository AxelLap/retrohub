import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDialogStore } from "@/lib/store/use-user-dialog-store";
import { useUserStore } from "@/lib/store/use-user-store";
import { Button } from "../ui/button";
import { ItemList } from "./ItemList";

export const UserDialog = () => {
  const { isDialogOpen, setIsDialogOpen } = useDialogStore();
  const userData = useUserStore();
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="h-[90%] w-[90%] rounded flex flex-col">
        <DialogHeader>
          <div className="mb-6">
            <img
              className="h-[70px] w-[70px] m-auto"
              src={userData.userImage}
            />
            <DialogTitle className="text-black">{userData.user}</DialogTitle>
          </div>
          <div className="h-[400px] overflow-scroll mb-6">
            <p className="text-black">My items</p>
            <ItemList />
          </div>
          <div className="flex justify-center gap-3 pt-8">
            <Button>Add New Item</Button>
            <Button variant="secondary">Modify item</Button>
            <Button variant="destructive">Delete Item</Button>
          </div>
          <Button
            className="w-fit m-auto"
            onClick={() => {
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
