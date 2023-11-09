import { Todos } from "@/lib/type";
import { useCallback, useMemo, useState } from "react";
import TodoCategoryGroup from "./TodoCategoryGroup";
import TodoViewTabCategory from "./TodoViewTabCategory";

const TodoViewTab: React.FC<{ todos: Todos }> = ({ todos }) => {
  const [categoryOpened, setCategoryOpened] = useState(() => {
    return todos.data[0]?.id ?? "";
  });

  const selectedCategory = useMemo(() => {
    const index = todos.data.map((todo) => todo.id).indexOf(categoryOpened);
    return todos.data[index];
  }, [categoryOpened, todos.data]);

  const handleCategoryClick = useCallback(
    (id: string) => setCategoryOpened(id),
    []
  );

  return (
    <div className="grid md:grid-cols-4 xl:grid-cols-5 gap-8">
      <div className="md:col-span-1 flex flex-col gap-2">
        <TodoViewTabCategory
          todos={todos}
          categoryOpened={categoryOpened}
          handleCategoryClick={handleCategoryClick}
        />
      </div>
      <div className="md:col-span-3 xl:col-span-4">
        <div className="w-full flex flex-col gap-4">
          {selectedCategory && <TodoCategoryGroup todos={selectedCategory} />}
        </div>
      </div>
    </div>
  );
};

export default TodoViewTab;
