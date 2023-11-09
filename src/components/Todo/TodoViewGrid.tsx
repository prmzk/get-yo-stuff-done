import { Todos } from "@/lib/type";
import TodoCategoryGroup from "./TodoCategoryGroup";
import AddCategory from "./AddCategory";

const TodoViewGrid: React.FC<{ todos: Todos }> = ({ todos }) => {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
      {todos.data.map((todoCat) => (
        <TodoCategoryGroup key={todoCat.id} todos={todoCat} />
      ))}
      <AddCategory />
    </div>
  );
};

export default TodoViewGrid;
