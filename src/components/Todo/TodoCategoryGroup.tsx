import { Todo, TodoCategory } from "@/lib/type";
import { Reorder } from "framer-motion";
import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import AddTodo from "./AddTodo";
import DeleteCategory from "./DeleteCategory";
import TodoCard from "./TodoCard";
import TodoCardDone from "./TodoCardDone";
import TodoCategoryTitle from "./TodoCategoryTitle";

type Props = {
  todos: TodoCategory;
  index: number;
  todosLength: number;
};

const TodoCategoryGroup: React.FC<Props> = ({ todos }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <TodoCategoryTitle title={todos.title} id={todos.id} />
        <DeleteCategory id={todos.id} />
      </div>
      <TodoGroup todos={todos.todos} categoryId={todos.id} />
      <AddTodo categoryId={todos.id} />
    </div>
  );
};

type PropsTodoGroup = {
  todos: Todo[];
  categoryId: string;
};

const TodoGroup: React.FC<PropsTodoGroup> = ({ todos, categoryId }) => {
  const { reorderTodoAction } = useContext(TodoContext);

  const handleReorder = (newTodos: Todo[]) => {
    reorderTodoAction({
      categoryId,
      newTodos,
    });
  };

  return (
    <>
      <Reorder.Group
        axis="y"
        values={todos.filter((todo) => todo.status === "not-done")}
        onReorder={(val) => handleReorder(val)}
        className="w-full flex flex-col gap-4 relative"
      >
        {todos
          .filter((todo) => todo.status === "not-done")
          .map((todo) => (
            <TodoCard key={todo.id} todo={todo} />
          ))}
      </Reorder.Group>
      {todos
        .filter((todo) => todo.status === "done")
        .map((todo) => (
          <TodoCardDone todo={todo} key={todo.id} />
        ))}
    </>
  );
};

export default TodoCategoryGroup;
