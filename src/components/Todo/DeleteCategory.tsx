import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useTodo } from "@/lib/hooks";
type Props = {
  id: string;
};

const DeleteCategory: React.FC<Props> = ({ id }) => {
  const { deletecategory } = useTodo();
  const handleDeleteCategory = () => {
    deletecategory({ id });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          size={"icon"}
          aria-label="Delete Todo"
          title="Delete Todo"
          className="h-6 w-8 flex-shrink-0"
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
