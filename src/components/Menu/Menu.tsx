import ClearTodo from "./ClearTodo";
import ExportDialog from "./ExportDialog";
import ImportDialog from "./ImportDialog";

const Menu = () => {
  return (
    <div className="mt-4 mb-24">
      <div className="flex gap-2 flex-wrap mb-4">
        <ImportDialog />
        <ExportDialog />
        <ClearTodo />
        {/* <Button
          variant="secondary"
          size="sm"
          className="text-xs h-fit px-3 py-1"
        >
          Toggle Category View
        </Button> */}
      </div>
      <p>Note: Click todo/category to edit.</p>
    </div>
  );
};

export default Menu;
