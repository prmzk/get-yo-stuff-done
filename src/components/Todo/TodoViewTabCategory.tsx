import { useKeyPress, useMediaQuery, useOutsideClick } from "@/lib/hooks";
import { Todos } from "@/lib/type";
import { LayoutGrid, PlusCircle } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { TodoContextMethod } from "../context/TodoContext";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";

type Props = {
  todos: Todos;
  handleCategoryClick: (arg: string) => void;
  categoryOpened: string;
};

const TodoViewTabCategory: React.FC<Props> = (props) => {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

  if (isSmallDevice) return <MobileTab {...props} />;
  else return <DesktopTab {...props} />;
};

const DesktopTab: React.FC<Props> = ({
  todos,
  categoryOpened,
  handleCategoryClick,
}) => {
  const { addCategoryAction } = useContext(TodoContextMethod);
  const [title, setTitle] = useState("");
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const handleAddCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTitle("");
    setEditing(false);
    addCategoryAction({
      title,
    });
  };

  const outsideRef = useOutsideClick(() => setEditing(false));
  useKeyPress("Escape", () => {
    if (editing) setEditing(false);
  });

  useEffect(() => {
    if (editing) ref.current?.focus();
  }, [editing]);

  useEffect(() => {
    handleCategoryClick(todos.data[todos.data.length - 1].id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos.data[todos.data.length - 1].id, handleCategoryClick]);

  return (
    <>
      <h1 className="text-lg font-bold mb-2 py-2 px-4 gap-1">Categories</h1>
      {todos.data.map((todoCat) => (
        <div
          key={todoCat.id}
          onClick={() => handleCategoryClick(todoCat.id)}
          className={twMerge(
            "text-primary flex items-center py-2 px-4 hover:bg-card cursor-pointer transition-all rounded-md gap-2",
            categoryOpened === todoCat.id ? "bg-card" : undefined
          )}
        >
          <LayoutGrid size={16} className="flex-shrink-0" />
          <h2 className="font-semibold break-all ">{todoCat.title}</h2>
        </div>
      ))}
      <div className="flex justify-center mt-2 w-full">
        {!editing ? (
          <Button
            variant="ghost"
            size="icon"
            className="w-full"
            onClick={() => setEditing(true)}
          >
            <PlusCircle className="text-primary" />
          </Button>
        ) : (
          <div ref={outsideRef} className="w-full">
            <form onSubmit={handleAddCategory} className="flex gap-2">
              <Input
                ref={ref}
                id={`title-new`}
                aria-label="new-category-title"
                required={true}
                minLength={1}
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder="New Category"
                className="text-primary border-0 rounded-none border-b focus-visible:ring-0 focus-visible:border-b-ring focus-visible:border-b-2"
              />
              <Button
                size={"icon"}
                variant={"outline"}
                aria-label="Add Todo"
                title="Add Todo"
                type="submit"
              >
                <PlusCircle size={16} strokeWidth={3} />
              </Button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

const MobileTab: React.FC<Props> = ({
  todos,
  categoryOpened,
  handleCategoryClick,
}) => {
  const [open, setOpen] = useState(false);
  const { addCategoryAction } = useContext(TodoContextMethod);
  const [title, setTitle] = useState("");
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const handleCategoryClickDialog = (id: string) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    handleCategoryClick(id);
    setOpen(false);
  };

  const handleAddCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTitle("");
    setEditing(false);
    addCategoryAction({
      title,
    });
    setOpen(false);
  };

  const outsideRef = useOutsideClick(() => setEditing(false));
  useKeyPress("Escape", () => {
    if (editing) setEditing(false);
  });

  useEffect(() => {
    if (editing) ref.current?.focus();
  }, [editing]);

  useEffect(() => {
    handleCategoryClick(todos.data[todos.data.length - 1].id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos.data[todos.data.length - 1].id, handleCategoryClick]);

  useEffect(() => {
    handleCategoryClick(todos.data[todos.data.length - 1].id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos.data[todos.data.length - 1].id, handleCategoryClick]);

  useEffect(() => {
    if (!open) setEditing(false);
  }, [open]);

  return (
    <>
      <Button
        variant="default"
        className="shadow-lg fixed w-[120px] h-[48px] bottom-4 right-4 flex gap-2 font-bold rounded-xl ring-white ring z-40"
        onClick={() => setOpen((prev) => !prev)}
      >
        <LayoutGrid className="flex-shrink-0" size={20} />
        Categories
      </Button>
      <Dialog open={open} onOpenChange={() => setOpen((prev) => !prev)}>
        <DialogContent className="w-full max-w-none data-[state=open]:!slide-in-from-bottom-full data-[state=closed]:!slide-out-to-bottom-full data-[state=open]:!zoom-in-100 data-[state=closed]:!zoom-out-100 !rounded-b-none top-[unset] bottom-0 translate-y-0 ">
          <div className="flex flex-col gap-1 mt-8 max-h-80 overflow-scroll">
            {todos.data.map((todoCat) => (
              <div
                key={todoCat.id}
                onClick={() => handleCategoryClickDialog(todoCat.id)}
                className={twMerge(
                  "text-primary flex items-center p-4 hover:bg-card cursor-pointer transition-all rounded-md gap-2",
                  categoryOpened === todoCat.id ? "bg-card" : undefined
                )}
              >
                <LayoutGrid size={16} className="flex-shrink-0" />
                <h2 className="font-semibold break-all ">{todoCat.title}</h2>
              </div>
            ))}
          </div>
          <div className="flex justify-center w-full">
            {!editing ? (
              <Button
                variant="ghost"
                size="icon"
                className="w-full"
                onClick={() => setEditing(true)}
              >
                <PlusCircle className="text-primary" />
              </Button>
            ) : (
              <div ref={outsideRef} className="w-full">
                <form onSubmit={handleAddCategory} className="flex gap-2">
                  <Input
                    ref={ref}
                    id={`title-new`}
                    aria-label="new-category-title"
                    required={true}
                    minLength={1}
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    placeholder="New Category"
                    className="text-primary border-0 rounded-none border-b focus-visible:ring-0 focus-visible:border-b-ring focus-visible:border-b-2"
                  />
                  <Button
                    size={"icon"}
                    variant={"outline"}
                    aria-label="Add Todo"
                    title="Add Todo"
                    type="submit"
                  >
                    <PlusCircle size={16} strokeWidth={3} />
                  </Button>
                </form>
              </div>
            )}
          </div>
          <DialogFooter className="w-full flex flex-col">
            <DialogClose asChild>
              <Button variant="secondary" className="w-full">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TodoViewTabCategory;
