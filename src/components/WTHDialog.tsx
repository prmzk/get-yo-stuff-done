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

type Props = {
  children: React.ReactNode;
};
const WTHDialog: React.FC<Props> = ({ children }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>What is this?</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 my-4 text-gray-200">
          <p className="text-sm">
            Just another to do app. Tired of all the complex to do web-app
            circulating the internet so I made one for myself.
          </p>

          <h2 className="text-md mt-4 font-semibold text-white">
            {"> How does the data stored?"}
          </h2>
          <p className="text-sm">
            This to do app does not use any server or api calls.
            <br /> No data stored on any server.
          </p>
          <p className="text-sm">
            It stores all of your data locally in the browser with a thing
            called
            <span className="font-mono"> localStorage</span> (don't worry bout
            it)
          </p>
          <p className="text-sm">
            So that means you cannot access it on other device (or another
            browser if yall into that idk)
          </p>
          <h2 className="text-md mt-4 font-semibold text-white">
            {">  Syncing Data"}
          </h2>
          <p className="text-sm">
            All you can do is copy the data by clicking the button and import it
            elsewhere. Just note that it is not synced so you have to sync it
            manually.
          </p>
          <h2 className="text-md mt-4 font-semibold text-white">We Coo?</h2>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button variant="secondary">Coo then</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WTHDialog;
