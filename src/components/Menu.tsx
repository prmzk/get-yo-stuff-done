import { Button } from "./ui/button";

const Menu = () => {
  return (
    <div className="flex mt-4 mb-24 gap-2 flex-wrap">
      <Button size="sm" className="text-xs h-fit px-3 py-1">
        Import
      </Button>
      <Button size="sm" className="text-xs h-fit px-3 py-1">
        Export
      </Button>
      <Button variant="secondary" size="sm" className="text-xs h-fit px-3 py-1">
        Toggle Category View
      </Button>
    </div>
  );
};

export default Menu;