import React from "react";
import { Button } from "../ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useTodo } from "@/lib/hooks";

type Props = {
  id: string;
  index: number;
  isLastTodo: boolean;
};

const ReorderTodo: React.FC<Props> = ({ index, isLastTodo, id }) => {
  const { moveTodo } = useTodo();

  const handleMoveTodoUp = () => {
    moveTodo({ id, dir: "up" });
  };

  const handleMoveTodoDown = () => {
    moveTodo({ id, dir: "down" });
  };
  return (
    <>
      {index !== 0 && (
        <Button
          size={"icon"}
          variant={"ghost"}
          aria-label="Up Todo"
          title="Up Todo"
          onClick={handleMoveTodoUp}
          className="w-fit px-1"
        >
          <ArrowUp className="opacity-75" size={12} strokeWidth={3} />
        </Button>
      )}
      {!isLastTodo && (
        <Button
          size={"icon"}
          variant={"ghost"}
          aria-label="Down Todo"
          title="Down Todo"
          className="w-fit px-1"
          onClick={handleMoveTodoDown}
        >
          <ArrowDown className="opacity-75" size={12} strokeWidth={3} />
        </Button>
      )}
    </>
  );
};

export default ReorderTodo;
