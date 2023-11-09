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
import { TodoContext } from "../context/TodoContext";
import { useToast } from "../ui/use-toast";
type Props = {
  id: string;
};

const DeleteTodo: React.FC<Props> = ({ id }) => {
  const { toast } = useToast();
  const { deleteTodoAction } = useContext(TodoContext);
  const handleDeleteTodo = () => {
    deleteTodoAction({ id });
    toast({
      title: "Todo successfully deleted",
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
