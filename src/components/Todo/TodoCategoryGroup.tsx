import { useTodo } from "@/lib/hooks";
import { Todo, TodoCategory } from "@/lib/type";
import { Reorder } from "framer-motion";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "../ui/button";
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

const TodoCategoryGroup: React.FC<Props> = ({ todos, index, todosLength }) => {
  const { moveCategory } = useTodo();

  const handleMoveCategoryUp = () => {
    moveCategory({ id: todos.id, dir: "up" });
  };

  const handleMoveCategoryDown = () => {
    moveCategory({ id: todos.id, dir: "down" });
  };

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
  const { reorderTodo } = useTodo();

  const handleReorder = (newTodos: Todo[]) => {
    reorderTodo({
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
