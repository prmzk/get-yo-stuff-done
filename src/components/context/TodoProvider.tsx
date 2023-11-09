import { getLocalStorageTodo, setLocalStorageTodo } from "@/lib/utils";
import {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { TodoContext, TodoContextMethod } from "./TodoContext";
import { ItemByActionType, reducer } from "./todo-reducer";

/* 
Adding a method:

todo-reducer.ts
- Declare the ActionType
- Declare the item on ItemByActionType
- Add the switch case on the reducer

TodoContext.ts
- Add type
- Create placeholder

TodoProvider.tsx
- Add a callback function with dispatch
- Add the method on the value memo
*/

const TodoProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [todos, dispatch] = useReducer(reducer, { data: [] }, () => {
    const stringifiedTodo = getLocalStorageTodo();
    return JSON.parse(stringifiedTodo);
  });

  const addTodoAction = useCallback((item: ItemByActionType["ADD-TODO"]) => {
    dispatch({
      type: "ADD-TODO",
      item,
    });
  }, []);

  const addCategoryAction = useCallback(
    (item: ItemByActionType["ADD-CATEGORY"]) => {
      dispatch({
        type: "ADD-CATEGORY",
        item,
      });
    },
    []
  );

  const doneTodoAction = useCallback((item: ItemByActionType["DONE-TODO"]) => {
    dispatch({
      type: "DONE-TODO",
      item,
    });
  }, []);

  const deleteTodoAction = useCallback(
    (item: ItemByActionType["DELETE-TODO"]) => {
      dispatch({
        type: "DELETE-TODO",
        item,
      });
    },
    []
  );

  const deleteCategoryAction = useCallback(
    (item: ItemByActionType["DELETE-CATEGORY"]) => {
      dispatch({
        type: "DELETE-CATEGORY",
        item,
      });
    },
    []
  );

  const editTodoAction = useCallback((item: ItemByActionType["EDIT-TODO"]) => {
    dispatch({
      type: "EDIT-TODO",
      item,
    });
  }, []);

  const editCategoryTitleAction = useCallback(
    (item: ItemByActionType["EDIT-CATEGORY-TITLE"]) => {
      dispatch({
        type: "EDIT-CATEGORY-TITLE",
        item,
      });
    },
    []
  );

  const reorderTodoAction = useCallback(
    (item: ItemByActionType["REORDER-TODO"]) => {
      dispatch({
        type: "REORDER-TODO",
        item,
      });
    },
    []
  );

  const moveCategoryAction = useCallback(
    (item: ItemByActionType["REORDER-CATEGORY"]) => {
      dispatch({
        type: "REORDER-CATEGORY",
        item,
      });
    },
    []
  );

  const importTodoAction = useCallback(
    (item: ItemByActionType["IMPORT-TODO"]) => {
      dispatch({
        type: "IMPORT-TODO",
        item,
      });
    },
    []
  );

  const clearTodoAction = useCallback(() => {
    dispatch({
      type: "CLEAR-TODO",
      item: null,
    });
  }, []);

  const value = useMemo(() => {
    return {
      todos,
    };
  }, [todos]);

  const methods = useMemo(() => {
    return {
      addTodoAction,
      addCategoryAction,
      doneTodoAction,
      deleteTodoAction,
      deleteCategoryAction,
      editTodoAction,
      editCategoryTitleAction,
      reorderTodoAction,
      moveCategoryAction,
      importTodoAction,
      clearTodoAction,
    };
  }, [
    addTodoAction,
    addCategoryAction,
    doneTodoAction,
    deleteTodoAction,
    deleteCategoryAction,
    editTodoAction,
    editCategoryTitleAction,
    reorderTodoAction,
    moveCategoryAction,
    importTodoAction,
    clearTodoAction,
  ]);

  useEffect(() => {
    setLocalStorageTodo(todos);
  }, [todos]);

  return (
    <TodoContextMethod.Provider value={methods}>
      <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
    </TodoContextMethod.Provider>
  );
};

export default TodoProvider;
