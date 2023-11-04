import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useSyncExternalStore,
} from "react";
import { Todo, TodoCategory, Todos } from "./type";
import { produce } from "immer";
import { useToast } from "@/components/ui/use-toast";
import { getLocalStorageTodo, setLocalStorageTodo } from "./utils";

/*  TO DO:
    TODO
    - Edit todo order
    - Move todo to another category


    CATEGORY
    - Edit category order
*/

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
                variant: "destructive",
              });
            } catch (e) {
              console.log(e);
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
            variant: "destructive",
          });
        } catch (e) {
          console.log(e);
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

  return {
    todos: store,
    addTodo,
    addCategory,
    doneTodo,
    deleteTodo,
    deletecategory,
    editTodo,
    editCategoryTitle,
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
