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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { getLocalStorageTodo } from "@/lib/utils";
import { useCopyToClipboard } from "@/lib/hooks";

const ExportDialog: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [storageData] = useState(() => getLocalStorageTodo());
  const copy = useCopyToClipboard();

  const downloadtxtfile = () => {
    const element = document.createElement("a");
    const file = new Blob([storageData], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `GYSD-todos.txt`;
    document.body.appendChild(element); // required for this to work in firefox
    element.click();
  };

  const handleCopy = () => {
    copy(storageData);
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
            <Label htmlFor="import-textarea">
              Paste your exported todo file here:
            </Label>
            <Textarea
              required
              aria-label="import"
              placeholder="Type your message here."
              id="import-textarea"
              className="h-60"
              value={storageData}
            />
          </div>
        </div>
        <DialogFooter>
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
