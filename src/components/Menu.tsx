import { Button } from "./ui/button";

const Menu = () => {
  return (
    <div className="mt-4 mb-24">
      <div className="flex gap-2 flex-wrap mb-4">
        <Button size="sm" className="text-xs h-fit px-3 py-1">
          Import
        </Button>
        <Button size="sm" className="text-xs h-fit px-3 py-1">
          Export
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="text-xs h-fit px-3 py-1"
        >
          Toggle Category View
        </Button>
      </div>
      <p>
        Note: Double click todo/category to edit. Drag todo/category to reorder.
      </p>
    </div>
  );
};

export default Menu;
