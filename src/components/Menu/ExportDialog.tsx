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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCopyToClipboard } from "@/lib/hooks";
import { useContext, useMemo, useState } from "react";
import { TodoContext } from "../context/TodoContext";

const ExportDialog: React.FC = () => {
  const { todos } = useContext(TodoContext);
  const [open, setOpen] = useState(false);
  const copy = useCopyToClipboard();

  const todoStringified = useMemo(() => {
    return JSON.stringify(todos);
  }, [todos]);

  const downloadtxtfile = () => {
    const element = document.createElement("a");
    const file = new Blob([todoStringified], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `GYSD-todos.txt`;
    document.body.appendChild(element); // required for this to work in firefox
    element.click();
  };

  const handleCopy = () => {
    copy(todoStringified);
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen((prev) => !prev)}>
      <DialogTrigger asChild>
        <Button className="text-xs">Export</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Export Todos</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 my-4 text-gray-200">
          <div className="grid w-full gap-4">
            <Label htmlFor="export-textarea">
              Paste your exported todo file here:
            </Label>
            <Textarea
              required
              aria-label="export"
              placeholder="Your export data"
              id="export-textarea"
              className="h-60"
              readOnly={true}
              value={todoStringified}
            />
          </div>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row sm:gap-0 gap-4">
          <Button variant="default" onClick={downloadtxtfile}>
            Save
          </Button>
          <Button variant="outline" onClick={handleCopy}>
            Copy to clipboard
          </Button>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExportDialog;
