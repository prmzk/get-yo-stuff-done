import { TodoCategory } from "@/lib/type";
import { memo } from "react";
import AddTodo from "./AddTodo";
import DeleteCategory from "./DeleteCategory";
import TodoCategoryTitle from "./TodoCategoryTitle";
import TodoGroup from "./TodoGroup";

type Props = {
  todos: TodoCategory;
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

export default TodoCategoryGroup;
