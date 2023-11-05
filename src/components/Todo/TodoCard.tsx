import { useKeyPress, useOutsideClick, useTodo } from "@/lib/hooks";
import { Todo } from "@/lib/type";
import { CheckCheckIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import DeleteTodo from "./DeleteTodo";
import ReorderTodo from "./ReorderTodo";

type Props = {
  todo: Todo;
  index: number;
  isLastTodo: boolean;
};
const TodoCard: React.FC<Props> = ({
  todo: { title, desc, id },
  index,
  isLastTodo,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [editing, setEditing] = useState(false);
  const [titleState, setTitleState] = useState(title);
  const [descState, setDescState] = useState(desc || "");
  const { doneTodo, editTodo } = useTodo();

  const handleDoneTodo = () => {
    doneTodo({ id });
  };

  const handleEditTodo = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    setEditing(false);
    editTodo({
      id,
      newTitle: titleState,
      newDesc: descState,
    });
  };

  const outsideRef = useOutsideClick(handleEditTodo);
  useKeyPress("Escape", () => {
    if (editing) setEditing(false);
  });

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing, inputRef]);

  return (
    <div className="flex flex-row gap-4">
      <div className="flex-shrink-0 flex gap-2 justify-end sm:justify-start">
        <Button
          size={"icon"}
          aria-label="Done Todo"
          title="Done Todo"
          onClick={handleDoneTodo}
        >
          <CheckCheckIcon size={16} strokeWidth={3} />
        </Button>
      </div>

      <div className="bg-card rounded-lg border shadow-sm p-2 px-4 flex gap-4 justify-between">
        {!editing ? (
          <div
            className="text-gray-200 flex flex-col gap-2 cursor-pointer"
            onClick={() => setEditing(true)}
          >
            <p className="text-md font-bold antialiased text-md break-all ">
              {title}
            </p>
            {desc && <p className="text-gray-400 text-sm break-all">{desc}</p>}
          </div>
        ) : (
          <div ref={outsideRef}>
            <form
              onSubmit={handleEditTodo}
              className="text-gray-200 flex flex-col gap-2 cursor-pointer"
            >
              <Input
                ref={inputRef}
                id={`edit-title-${id}`}
                aria-label="edit-todo-title"
                required={true}
                minLength={1}
                onChange={(e) => setTitleState(e.target.value)}
                value={titleState}
                placeholder="Edit New Title"
                className="text-md font-bold antialiased border-0 rounded-none border-b focus-visible:ring-0 focus-visible:border-b-ring focus-visible:border-b-2 bg-card px-0"
              />
              <Input
                id={`edit-desc-${id}`}
                aria-label="edit-todo-description"
                onChange={(e) => setDescState(e.target.value)}
                value={descState}
                placeholder="Description"
                className="text-gray-400 text-sm border-0 rounded-none border-b focus-visible:ring-0 focus-visible:border-b-ring focus-visible:border-b-2 bg-card px-0"
              />
              <Button size={"icon"} className="hidden" type="submit"></Button>
            </form>
          </div>
        )}

        <DeleteTodo id={id} />
      </div>
      <div className="self-start flex items-center -ml-2">
        <ReorderTodo index={index} isLastTodo={isLastTodo} id={id} />
      </div>
    </div>
  );
};

export default TodoCard;
