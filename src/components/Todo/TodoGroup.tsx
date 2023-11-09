import { Todo } from "@/lib/type";
import { Reorder } from "framer-motion";
import { memo, useContext, useMemo } from "react";
import { TodoContextMethod } from "../context/TodoContext";
import TodoCard from "./TodoCard";
import TodoCardDone from "./TodoCardDone";

type PropsTodoGroup = {
  todos: Todo[];
  categoryId: string;
};

const TodoGroup: React.FC<PropsTodoGroup> = memo(({ todos, categoryId }) => {
  const { reorderTodoAction } = useContext(TodoContextMethod);

  const handleReorder = (newTodos: Todo[]) => {
    reorderTodoAction({
      categoryId,
      newTodos: [...newTodos, ...doneTodo],
    });
  };

  const NotDoneTodo = useMemo(() => {
    return todos.filter((todo) => todo.status === "not-done");
  }, [todos]);

  const doneTodo = useMemo(() => {
    return todos.filter((todo) => todo.status === "done");
  }, [todos]);

  return (
    <>
      <Reorder.Group
        axis="y"
        values={NotDoneTodo}
        onReorder={(val) => handleReorder(val)}
        className="w-full flex flex-col gap-4 relative"
      >
        {NotDoneTodo.map((todo) => (
          <TodoCard key={todo.id} todo={todo} />
        ))}
      </Reorder.Group>
      {doneTodo.map((todo) => (
        <TodoCardDone todo={todo} key={todo.id} />
      ))}
    </>
  );
});

export default TodoGroup;
