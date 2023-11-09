import { Todos } from "@/lib/type";
import { createContext } from "react";
import { ItemByActionType } from "./todo-reducer";

const initialContextValue: {
  todos: Todos;
} = {
  todos: {
    data: [],
  },
};

const initialContextMenthods: {
  addTodoAction: (item: ItemByActionType["ADD-TODO"]) => void;
  addCategoryAction: (item: ItemByActionType["ADD-CATEGORY"]) => void;
  doneTodoAction: (item: ItemByActionType["DONE-TODO"]) => void;
  deleteTodoAction: (item: ItemByActionType["DELETE-TODO"]) => void;
  deleteCategoryAction: (item: ItemByActionType["DELETE-CATEGORY"]) => void;
  editTodoAction: (item: ItemByActionType["EDIT-TODO"]) => void;
  editCategoryTitleAction: (
    item: ItemByActionType["EDIT-CATEGORY-TITLE"]
  ) => void;
  reorderTodoAction: (item: ItemByActionType["REORDER-TODO"]) => void;
  moveCategoryAction: (item: ItemByActionType["REORDER-CATEGORY"]) => void;
  importTodoAction: (item: ItemByActionType["IMPORT-TODO"]) => void;
  clearTodoAction: () => void;
} = {
  addTodoAction: () => {},
  addCategoryAction: () => {},
  doneTodoAction: () => {},
  deleteTodoAction: () => {},
  deleteCategoryAction: () => {},
  editTodoAction: () => {},
  editCategoryTitleAction: () => {},
  reorderTodoAction: () => {},
  moveCategoryAction: () => {},
  importTodoAction: () => {},
  clearTodoAction: () => {},
};

export const TodoContext = createContext(initialContextValue);
export const TodoContextMethod = createContext(initialContextMenthods);
