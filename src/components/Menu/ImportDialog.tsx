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
import { isSatisfiesTodoType } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";

const ImportDialog: React.FC = () => {
  const { importTodoAction } = useContext(TodoContext);
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [imported, setImported] = useState("");

  const handleImport = () => {
    if (!imported) return;

    try {
      const parsed = JSON.parse(imported);

      if (!isSatisfiesTodoType(parsed)) {
        throw "";
      }
      importTodoAction({ newTodos: parsed });
      setOpen(false);
      setImported("");
      toast({
        title: "Import success.",
      });
    } catch (e) {
      toast({
        title: "Parsing failed! Make sure your data is correct",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen((prev) => !prev)}>
      <DialogTrigger asChild>
        <Button className="text-xs">Import</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Import Todos</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 my-4 text-gray-200">
          <div className="grid w-full gap-4">
            <Label htmlFor="import-textarea">
              Paste your exported todo file here:
            </Label>
            <Textarea
              required
              aria-label="import"
              placeholder="Paste your data here"
              id="import-textarea"
              className="h-60"
              onChange={(e) => setImported(e.target.value)}
              value={imported}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="secondary" type="submit" onClick={handleImport}>
            Confirm Import
          </Button>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImportDialog;
