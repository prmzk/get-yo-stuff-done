import { useTodo } from "@/lib/hooks";
import AddCategory from "./AddCategory";
import TodoCategoryGroup from "./TodoCategoryGroup";

const TodoSection = () => {
  const { todos } = useTodo();
  return (
    <div className="flex flex-col gap-8">
      {todos.data.map((todoCat) => (
        <TodoCategoryGroup key={todoCat.id} todos={todoCat} />
      ))}
      <AddCategory />
    </div>
  );
};

export default TodoSection;
