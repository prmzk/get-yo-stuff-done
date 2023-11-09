import {
  getLocalStorageCategoryView,
  setLocalStorageCategoryView,
} from "@/lib/utils";
import { useContext, useEffect, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import TodoViewGrid from "./TodoViewGrid";
import TodoViewTab from "./TodoViewTab";

const TodoSection = () => {
  const [categoryView, setCategoryView] = useState<"tab" | "grid">(() => {
    return getLocalStorageCategoryView();
  });
  const { todos } = useContext(TodoContext);

  useEffect(() => {
    setLocalStorageCategoryView(categoryView);
  }, [categoryView]);

  return (
    <>
      <div className="flex items-center gap-3 mb-8">
        <Label htmlFor="category-view">Grids</Label>
        <Switch
          id="category-view"
          checked={categoryView === "tab"}
          onCheckedChange={(checked) =>
            checked ? setCategoryView("tab") : setCategoryView("grid")
          }
          className="data-[state=unchecked]:bg-primary"
        />
        <Label htmlFor="category-view">Tabs</Label>
      </div>

      {categoryView === "grid" && <TodoViewGrid todos={todos} />}
      {categoryView === "tab" && <TodoViewTab todos={todos} />}
    </>
  );
};

export default TodoSection;
