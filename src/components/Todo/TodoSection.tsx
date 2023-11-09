import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import AddCategory from "./AddCategory";
import TodoCategoryGroup from "./TodoCategoryGroup";

const TodoSection = () => {
  const { todos } = useContext(TodoContext);

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
