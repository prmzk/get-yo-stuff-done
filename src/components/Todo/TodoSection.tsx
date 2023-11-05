import { useTodo } from "@/lib/hooks";
import AddCategory from "./AddCategory";
import TodoCategoryGroup from "./TodoCategoryGroup";

const TodoSection = () => {
  const { todos } = useTodo();
  return (
    <div className="flex flex-col gap-8">
      {todos.data.map((todoCat, index) => (
        <TodoCategoryGroup
          key={todoCat.id}
          todos={todoCat}
          index={index}
          todosLength={todos.data.length}
        />
      ))}
      <AddCategory />
    </div>
  );
};

export default TodoSection;
