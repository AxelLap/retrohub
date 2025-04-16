import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDialogStore } from "@/lib/store/use-user-dialog-store";
import { deleteItem } from "@/lib/supabase/items/delete-item";
import { TriangleAlert } from "lucide-react";
import { Button } from "../ui/button";

export const DeleteItemDialog = ({ item }) => {
  const {
    isDeleteWarningOpen,
    setIsDeleteWarningOpen,
    clearItemToDelete,
    itemToDeleteId,
    itemToDeleteImage,
    setIsDialogOpen,
  } = useDialogStore();

  return (
    <Dialog
      className="z-40"
      open={isDeleteWarningOpen}
      onOpenChange={setIsDeleteWarningOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-red-500 flex gap-2 justify-center items-center">
            <TriangleAlert /> This action cannot be undone
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to delete this item?
        </DialogDescription>
        <div className="flex justify-end gap-4">
          <Button
            onClick={() => {
              clearItemToDelete();
              setIsDeleteWarningOpen();
            }}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              deleteItem(itemToDeleteId, itemToDeleteImage);
              clearItemToDelete();
              setIsDeleteWarningOpen();
              setIsDialogOpen(); // Fermer après suppression
            }}
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
