import { TodoCategory } from "@/lib/type";
import { produce } from "immer";
import { useCallback, useMemo } from "react";
import AddTodo from "./AddTodo";
import DeleteCategory from "./DeleteCategory";
import TodoCard from "./TodoCard";
import TodoCardDone from "./TodoCardDone";
import TodoCategoryTitle from "./TodoCategoryTitle";
import { Button } from "../ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useTodo } from "@/lib/hooks";

type Props = {
  todos: TodoCategory;
  index: number;
  todosLength: number;
};

const TodoCategoryGroup: React.FC<Props> = ({ todos, index, todosLength }) => {
  const { moveCategory } = useTodo();

  const handleMoveCategoryUp = () => {
    moveCategory({ id: todos.id, dir: "up" });
  };

  const handleMoveCategoryDown = () => {
    moveCategory({ id: todos.id, dir: "down" });
  };

  const sortedTodo = useMemo(() => {
    return produce(todos, (draft) => {
      draft.todos.sort((todoA, todoB) => {
        if (todoA.status !== "done" && todoB.status === "done") return -1;
        if (todoA.status === "done" && todoB.status !== "done") return 1;
        return 1;
      });
    });
  }, [todos]);

  const isLastTodo = useCallback(
    (index: number) => {
      if (index === sortedTodo.todos.length - 1) return true;
      const undoneTodo = sortedTodo.todos.filter(
        (todo) => todo.status === "not-done"
      );
      if (index === undoneTodo.length - 1) return true;

      return false;
    },
    [sortedTodo]
  );

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <TodoCategoryTitle title={todos.title} id={todos.id} />
        <DeleteCategory id={todos.id} />
        <div className="self-start flex items-center">
          {index !== 0 && (
            <Button
              size={"icon"}
              variant={"ghost"}
              aria-label="Up Todo"
              title="Up Todo"
              onClick={handleMoveCategoryUp}
            >
              <ArrowUp className="opacity-75" size={12} strokeWidth={3} />
            </Button>
          )}
          {index !== todosLength - 1 && (
            <Button
              size={"icon"}
              variant={"ghost"}
              aria-label="Down Todo"
              title="Down Todo"
              onClick={handleMoveCategoryDown}
            >
              <ArrowDown className="opacity-75" size={12} strokeWidth={3} />
            </Button>
          )}
        </div>
      </div>
      {sortedTodo.todos.map((todo, index) =>
        todo.status === "not-done" ? (
          <TodoCard
            todo={todo}
            key={todo.id}
            index={index}
            isLastTodo={isLastTodo(index)}
          />
        ) : (
          <TodoCardDone todo={todo} key={todo.id} />
        )
      )}
      <AddTodo categoryId={todos.id} />
    </div>
  );
};

export default TodoCategoryGroup;
