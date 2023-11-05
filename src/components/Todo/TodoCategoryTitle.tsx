import { useTodo, useOutsideClick, useKeyPress } from "@/lib/hooks";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";

type Props = {
  title: string;
  id: string;
};

const TodoCategoryTitle: React.FC<Props> = ({ title, id }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [editing, setEditing] = useState(false);
  const [titleState, setTitleState] = useState(title);
  const { editCategoryTitle } = useTodo();
  const handleEditCategory = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    setEditing(false);
    editCategoryTitle({
      id: id,
      newTitle: titleState,
    });
  };

  const outsideRef = useOutsideClick(handleEditCategory);
  useKeyPress("Escape", () => {
    if (editing) setEditing(false);
  });

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing, inputRef]);

  return !editing ? (
    <h1
      className="text-2xl font-bold text-primary break-all cursor-pointer"
      onClick={() => setEditing(true)}
    >
      {title}
    </h1>
  ) : (
    <div ref={outsideRef}>
      <form onSubmit={handleEditCategory}>
        <Input
          ref={inputRef}
          id={`edit-title-${id}`}
          aria-label="edit-category-title"
          required={true}
          minLength={1}
          onChange={(e) => setTitleState(e.target.value)}
          value={titleState}
          placeholder="Edit Category"
          className="text-2xl font-bold text-primary border-0 rounded-none border-b focus-visible:ring-0 focus-visible:border-b-ring focus-visible:border-b-2"
        />
      </form>
    </div>
  );
};

export default TodoCategoryTitle;