import React, { useId, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";
import { useTodo } from "@/lib/hooks";

type Props = {
  categoryId: string;
};

const AddTodo: React.FC<Props> = ({ categoryId }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const id = useId();
  const { addTodo } = useTodo();

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTitle("");
    setDesc("");
    addTodo({
      newTodo: { title, desc, status: "not-done" },
      categoryId,
    });
  };
  return (
    <form onSubmit={handleAddTodo}>
      <div className="flex flex-row gap-4 mt-4">
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
            placeholder="New Title"
            className="text-md font-bold antialiased border-0 rounded-none border-b focus-visible:ring-0 focus-visible:border-b-ring focus-visible:border-b-2"
          />
          <Input
            id={`desc-${id}`}
            aria-label="new-todo-description"
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            placeholder="Description"
            className="text-gray-400 text-sm border-0 rounded-none border-b focus-visible:ring-0 focus-visible:border-b-ring focus-visible:border-b-2"
          />
        </div>
      </div>
    </form>
  );
};

export default AddTodo;
