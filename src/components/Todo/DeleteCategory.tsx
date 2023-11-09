import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { useContext } from "react";
import { TodoContextMethod } from "../context/TodoContext";
import { useToast } from "../ui/use-toast";
type Props = {
  id: string;
};

const DeleteCategory: React.FC<Props> = ({ id }) => {
  const { toast } = useToast();
  const { deleteCategoryAction } = useContext(TodoContextMethod);
  const handleDeleteCategory = () => {
    deleteCategoryAction({ id });
    toast({
      title: "Category successfully deleted",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          size={"icon"}
          aria-label="Delete Todo"
          title="Delete Todo"
          className="flex-shrink-0"
        >
          <Trash2 size={12} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="mt-4">
            You are about to delete this category ❌
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 my-4 text-gray-200">
          <h2 className="text-md font-semibold text-white">
            <span className="text-destructive font-bold">WARNING!</span>
            <br />
            You will also delete ALL of the todo under this category!!
          </h2>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleDeleteCategory}
            className="mb-4 sm:mb-0"
          >
            Confirm Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCategory;
