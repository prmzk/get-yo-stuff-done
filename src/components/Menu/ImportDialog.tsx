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
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Label } from "@radix-ui/react-label";
import { useToast } from "../ui/use-toast";
import { isSatisfiesTodoType, setLocalStorageTodo } from "@/lib/utils";

const ImportDialog: React.FC = () => {
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
      setLocalStorageTodo(parsed);
      setOpen(false);
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
              placeholder="Type your message here."
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
