import { Todo } from "@/lib/type";
import { UndoIcon } from "lucide-react";
import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import { Button } from "../ui/button";
import DeleteTodo from "./DeleteTodo";

type Props = {
  todo: Todo;
};
const TodoCardDone: React.FC<Props> = ({ todo: { title, desc, id } }) => {
  const { doneTodoAction } = useContext(TodoContext);

  const handleDoneTodo = () => {
    doneTodoAction({ id });
  };

  return (
    <div className="flex flex-row gap-4">
      <div className="flex-shrink-0 flex gap-2 justify-end sm:justify-start">
        <Button
          variant={"secondary"}
          size={"icon"}
          aria-label="Undone Todo"
          title="Undone Todo"
          onClick={handleDoneTodo}
        >
          <UndoIcon size={16} strokeWidth={3} />
        </Button>
      </div>
      <div className="bg-card rounded-lg border shadow-sm p-2 px-4 flex gap-2 justify-between">
        <div className="text-gray-200 flex flex-col gap-2">
          <p className="text-md font-bold antialiased text-md line-through brightness-50 break-all">
            {title}
          </p>
          {desc && (
            <p className="text-gray-400 text-sm break-all line-through whitespace-pre-line brightness-50 mb-2">
              {desc}
            </p>
          )}
        </div>
        <DeleteTodo id={id} />
      </div>
    </div>
  );
};

export default TodoCardDone;
