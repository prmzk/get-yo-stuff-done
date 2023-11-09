import { useKeyPress, useOutsideClick } from "@/lib/hooks";
import { Todo } from "@/lib/type";
import { Reorder, useDragControls } from "framer-motion";
import { CheckCheckIcon, Grip } from "lucide-react";
import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { TodoContext } from "../context/TodoContext";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import DeleteTodo from "./DeleteTodo";
import { Textarea } from "../ui/textarea";

type Props = {
  todo: Todo;
};
const TodoCard: React.FC<Props> = ({ todo }) => {
  const { id, title, desc } = todo;
  const inputRef = useRef<HTMLInputElement>(null);
  const controls = useDragControls();

  const [cancelAnimation, setCancelAnimation] = useState(false);
  const [editing, setEditing] = useState(false);
  const [titleState, setTitleState] = useState(title);
  const [descState, setDescState] = useState(desc || "");
  const { doneTodoAction, editTodoAction } = useContext(TodoContext);

  const handleDoneTodo = () => {
    doneTodoAction({ id });
  };

  const handleEditTodo = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    setEditing(false);
    editTodoAction({
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

  useLayoutEffect(() => {
    setCancelAnimation(editing);
  }, [editing]);

  return (
    <Reorder.Item
      value={todo}
      dragListener={false}
      dragControls={controls}
      transition={cancelAnimation || editing ? { duration: 0 } : undefined}
    >
      <div className="flex flex-row gap-4 transition-none h-fit w-full">
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

        <div className="bg-card rounded-lg border shadow-sm p-2 px-4 flex gap-4 justify-between w-full">
          {!editing ? (
            <div
              className="text-gray-200 flex flex-col gap-2 cursor-pointer w-full"
              onClick={() => setEditing(true)}
            >
              <p className="text-md font-bold antialiased text-md break-all ">
                {title}
              </p>
              {desc && (
                <p className="text-gray-400 text-sm break-all whitespace-pre-line mb-2">
                  {desc}
                </p>
              )}
            </div>
          ) : (
            <div ref={outsideRef} className="w-full">
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
                <Textarea
                  id={`edit-desc-${id}`}
                  aria-label="edit-todo-description"
                  onChange={(e) => setDescState(e.target.value)}
                  value={descState}
                  placeholder="Description"
                  className="text-gray-400 text-sm border-0 rounded-none border-b focus-visible:outline-none focus-visible:ring-0 focus-visible:border-b-ring focus-visible:border-b-2 bg-card p-0 focus-visible:ring-offset-0"
                />
                <Button size={"icon"} className="hidden" type="submit"></Button>
              </form>
            </div>
          )}

          <DeleteTodo id={id} />
        </div>
        <div
          className="flex items-center cursor-grab touch-none"
          onPointerDown={(e) => {
            e.preventDefault();
            controls.start(e);
          }}
        >
          <Grip className="reorder-handle" />
        </div>
      </div>
    </Reorder.Item>
  );
};

export default TodoCard;
