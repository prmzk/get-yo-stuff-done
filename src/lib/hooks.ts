import { useToast } from "@/components/ui/use-toast";
import { produce } from "immer";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { Todo, TodoCategory, Todos } from "./type";
import { getLocalStorageTodo, setLocalStorageTodo } from "./utils";

export const useTodo = () => {
  const { toast } = useToast();
  // Subscribe to the browser storage ...
  // ... and trigger re renders
  const stringifedStore = useSyncExternalStore(
    (cb) => {
      window.addEventListener("storage", () => {
        cb();
      });
      return () => window.removeEventListener("storage", cb);
    },
    () => getLocalStorageTodo()
  );

  const store: Todos = useMemo(() => {
    return JSON.parse(stringifedStore);
  }, [stringifedStore]);

  const setTodo = useCallback(
    (cb: (draft: Todos) => void) => {
      try {
        setLocalStorageTodo(produce(store, cb));
      } catch (e) {
        console.warn(e);
      }
    },
    [store]
  );

  const addTodo = useCallback(
    (args: { newTodo: Omit<Todo, "id">; categoryId: string }) => {
      const { newTodo, categoryId } = args;

      setTodo((draft: Todos) => {
        const categoryIndex = draft.data
          .map((todoCategory) => todoCategory.id)
          .indexOf(categoryId);

        if (categoryIndex < 0) return;

        draft.data[categoryIndex].todos.push({
          id: crypto.randomUUID(),
          ...newTodo,
        });
      });
    },
    [setTodo]
  );

  const addCategory = useCallback(
    (args: { title: string }) => {
      const { title } = args;
      const newCategory: TodoCategory = {
        id: crypto.randomUUID(),
        title,
        todos: [],
      };

      setTodo((draft) => {
        draft.data.push(newCategory);
      });
    },
    [setTodo]
  );

  const doneTodo = useCallback(
    (args: { id: string }) => {
      const { id } = args;

      setTodo((draft) => {
        let categoryIndex = null;
        let todoIndex = null;

        try {
          draft.data.forEach((todoCategory, todoCategoryIndex) => {
            const index = todoCategory.todos.map((todo) => todo.id).indexOf(id);

            if (index >= 0) {
              todoIndex = index;
              categoryIndex = todoCategoryIndex;
              throw "found";
            }
          });
        } catch (e) {
          if (e === "found" && categoryIndex !== null && todoIndex !== null) {
            const newTodo = { ...draft.data[categoryIndex].todos[todoIndex] };
            draft.data[categoryIndex].todos.splice(todoIndex, 1);

            if (newTodo.status === "done") newTodo.status = "not-done";
            else newTodo.status = "done";

            draft.data[categoryIndex].todos.push(newTodo);
          }
        }
      });
    },
    [setTodo]
  );

  const deleteTodo = useCallback(
    (args: { id: string }) => {
      const { id } = args;

      setTodo((draft) => {
        let categoryIndex = null;
        let todoIndex = null;

        try {
          draft.data.forEach((todoCategory, todoCategoryIndex) => {
            const index = todoCategory.todos.map((todo) => todo.id).indexOf(id);

            if (index >= 0) {
              todoIndex = index;
              categoryIndex = todoCategoryIndex;
              throw "found";
            }
          });
        } catch (e) {
          if (e === "found" && categoryIndex !== null && todoIndex !== null) {
            try {
              draft.data[categoryIndex].todos.splice(todoIndex, 1);
              toast({
                title: "Todo deleted",
              });
            } catch (e) {
              let error = e;
              if (typeof e !== "string") error = JSON.stringify(error);
              toast({
                title: error as string,
              });
            }
          }
        }
      });
    },
    [setTodo, toast]
  );

  const deletecategory = useCallback(
    (args: { id: string }) => {
      const { id } = args;

      setTodo((draft) => {
        const index = draft.data
          .map((todoCategory) => todoCategory.id)
          .indexOf(id);

        try {
          draft.data.splice(index, 1);
          toast({
            title: "Category deleted",
          });
        } catch (e) {
          let error = e;
          if (typeof e !== "string") error = JSON.stringify(error);
          toast({
            title: error as string,
          });
        }
      });
    },
    [setTodo, toast]
  );

  const editTodo = useCallback(
    (args: { id: string; newTitle: string; newDesc: string }) => {
      const { id, newTitle, newDesc } = args;

      setTodo((draft) => {
        let categoryIndex = null;
        let todoIndex = null;

        try {
          draft.data.forEach((todoCategory, todoCategoryIndex) => {
            const index = todoCategory.todos.map((todo) => todo.id).indexOf(id);

            if (index >= 0) {
              todoIndex = index;
              categoryIndex = todoCategoryIndex;
              throw "found";
            }
          });
        } catch (e) {
          if (e === "found" && categoryIndex !== null && todoIndex !== null) {
            draft.data[categoryIndex].todos[todoIndex].title = newTitle;
            draft.data[categoryIndex].todos[todoIndex].desc = newDesc;
          }
        }
      });
    },
    [setTodo]
  );

  const editCategoryTitle = useCallback(
    (args: { id: string; newTitle: string }) => {
      const { id, newTitle } = args;

      setTodo((draft) => {
        const index = draft.data
          .map((todoCategory) => todoCategory.id)
          .indexOf(id);

        draft.data[index].title = newTitle;
      });
    },
    [setTodo]
  );

  const reorderTodo = useCallback(
    (args: { categoryId: string; newTodos: Todo[] }) => {
      const { categoryId, newTodos } = args;
      console.log("jalan", categoryId);
      setTodo((draft) => {
        const index = draft.data
          .map((todoCategory) => todoCategory.id)
          .indexOf(categoryId);

        draft.data[index].todos = newTodos;
      });
    },
    [setTodo]
  );

  const moveCategory = useCallback(
    (args: { id: string; dir: "up" | "down" }) => {
      const { id, dir } = args;

      setTodo((draft) => {
        const index = draft.data
          .map((todoCategory) => todoCategory.id)
          .indexOf(id);

        const [reorderingCategory] = draft.data.splice(index, 1);
        draft.data.splice(
          dir === "up" ? index - 1 : index + 1,
          0,
          reorderingCategory
        );
      });
    },
    [setTodo]
  );

  return {
    todos: store,
    addTodo,
    addCategory,
    doneTodo,
    deleteTodo,
    deletecategory,
    editTodo,
    editCategoryTitle,
    reorderTodo,
    moveCategory,
  };
};

export const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback]);

  return ref;
};

export const useKeyPress = (keyPress: string, callback: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: KeyboardEvent) => {
      if (event.key === keyPress) {
        callback();
      }
    };

    document.addEventListener("keydown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleClickOutside);
    };
  }, [callback, keyPress]);
};

export function useCopyToClipboard(): (text: string) => Promise<boolean> {
  const { toast } = useToast();
  const copy: (text: string) => Promise<boolean> = async (text) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported");
      return false;
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard",
      });
      return true;
    } catch (error) {
      console.warn("Copy failed", error);
      return false;
    }
  };

  return copy;
}

export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
