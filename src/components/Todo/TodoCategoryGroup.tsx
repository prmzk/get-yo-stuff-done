import { Todo, TodoCategory } from "@/lib/type";
import { Reorder } from "framer-motion";
import { memo, useContext, useMemo } from "react";
import { TodoContextMethod } from "../context/TodoContext";
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

const TodoCategoryGroup: React.FC<Props> = memo(({ todos }) => {
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
});

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

export default TodoCategoryGroup;
