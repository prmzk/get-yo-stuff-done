import React, { useId, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";
import { useTodo } from "@/lib/hooks";

const AddCategory = () => {
  const { addCategory } = useTodo();
  const [title, setTitle] = useState("");

  const id = useId();
  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTitle("");
    addCategory({
      title,
    });
  };

  return (
    <form onSubmit={handleAddTodo}>
      <div className="flex flex-row gap-2 mt-4">
        <div className="flex-shrink-0 flex gap-2 justify-end sm:justify-start">
          <Button
            size={"icon"}
            variant={"outline"}
            aria-label="Add Todo"
            title="Add Todo"
            type="submit"
          >
            <PlusCircle size={16} strokeWidth={3} />
          </Button>
        </div>
        <div className="flex flex-col w-full">
          <Input
            id={`title-${id}`}
            aria-label="new-todo-title"
            required={true}
            minLength={1}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="New Category"
            className="text-2xl font-bold text-primary border-0 rounded-none border-b focus-visible:ring-0 focus-visible:border-b-ring focus-visible:border-b-2"
          />
        </div>
      </div>
    </form>
  );
};

export default AddCategory;
