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
import { clearLocalStorageTodo } from "@/lib/utils";
import { useState } from "react";
import { useToast } from "../ui/use-toast";

const ClearTodo: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleClearTodo = () => {
    try {
      clearLocalStorageTodo();
      toast({
        title: "Todo is cleared",
      });
      setOpen(false);
    } catch {
      console.log("Unable to clear todo");
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen((prev) => !prev)}>
      <DialogTrigger asChild>
        <Button className="text-xs" variant={"destructive"}>
          Clear Todo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="mt-4 mb-8">
            Are you sure you want to clear all of the todos?
          </DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleClearTodo}
            className="mb-4 sm:mb-0"
          >
            Confirm Clear
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ClearTodo;
