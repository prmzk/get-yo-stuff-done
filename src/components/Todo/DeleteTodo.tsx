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

const DeleteTodo: React.FC<Props> = ({ id }) => {
  const { deleteTodo } = useTodo();
  const handleDeleteTodo = () => {
    deleteTodo({ id });
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
            You are about to delete this todo ❌
          </DialogTitle>
        </DialogHeader>
        <DialogFooter className="mt-8">
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={handleDeleteTodo}
              className="mb-4 sm:mb-0"
            >
              Confirm Delete
            </Button>
          </DialogFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTodo;
