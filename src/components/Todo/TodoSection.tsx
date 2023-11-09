import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import AddCategory from "./AddCategory";
import TodoCategoryGroup from "./TodoCategoryGroup";

const TodoSection = () => {
  const { todos } = useContext(TodoContext);

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
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
