import { TodoCategory } from "@/lib/type";
import { produce } from "immer";
import { useMemo } from "react";
import AddTodo from "./AddTodo";
import DeleteCategory from "./DeleteCategory";
import TodoCard from "./TodoCard";
import TodoCardDone from "./TodoCardDone";

type Props = {
  todos: TodoCategory;
};

const TodoCategoryGroup: React.FC<Props> = ({ todos }) => {
  const sortedTodo = useMemo(() => {
    return produce(todos, (draft) => {
      draft.todos.sort((todoA, todoB) => {
        if (todoA.status !== "done" && todoB.status === "done") return -1;
        if (todoA.status === "done" && todoB.status !== "done") return 1;
        return 1;
      });
    });
  }, [todos]);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold text-primary break-all">
          {sortedTodo.title}
        </h1>
        <DeleteCategory id={todos.id} />
      </div>
      {/* {todos.todos.map((todo) => */}
      {sortedTodo.todos.map((todo) =>
        todo.status === "not-done" ? (
          <TodoCard todo={todo} key={todo.id} />
        ) : (
          <TodoCardDone todo={todo} key={todo.id} />
        )
      )}
      <AddTodo categoryId={todos.id} />
    </div>
  );
};

export default TodoCategoryGroup;
