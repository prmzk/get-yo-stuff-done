import { CheckCheckIcon, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

type Props = {
  todo: { title: string; desc?: string };
};
const TodoCard: React.FC<Props> = ({ todo: { title, desc } }) => {
  return (
    <div className="bg-card rounded-lg border shadow-sm p-6 flex flex-col sm:flex-row justify-between gap-6 sm:gap-14">
      <div className=" text-gray-200 flex flex-col gap-2">
        <p className="text-lg font-bold antialiased text-md">{title}</p>
        {desc && <p className="text-gray-400 text-sm">{desc}</p>}
      </div>
      <div className="flex-shrink-0 flex sm:flex-col gap-2 justify-end sm:justify-start">
        <Button size={"icon"} aria-label="Done Todo" title="Done Todo">
          <CheckCheckIcon size={16} strokeWidth={3} />
        </Button>
        <Button
          variant={"destructive"}
          size={"icon"}
          aria-label="Delete Todo"
          title="Delete Todo"
        >
          <Trash2 size={16} />
        </Button>
      </div>
    </div>
  );
};

export default TodoCard;
