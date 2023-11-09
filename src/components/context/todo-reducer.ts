import { Todo, Todos } from "@/lib/type";
import { produce } from "immer";

export type ActionType =
  | "ADD-TODO"
  | "ADD-CATEGORY"
  | "DONE-TODO"
  | "DELETE-TODO"
  | "DELETE-CATEGORY"
  | "EDIT-TODO"
  | "EDIT-CATEGORY-TITLE"
  | "REORDER-TODO"
  | "REORDER-CATEGORY"
  | "CLEAR-TODO"
  | "IMPORT-TODO";

export type ItemByActionType = {
  "ADD-TODO": { newTodo: Omit<Todo, "id" | "status">; categoryId: string };
  "ADD-CATEGORY": { title: string };
  "DONE-TODO": { id: string };
  "DELETE-TODO": { id: string };
  "DELETE-CATEGORY": { id: string };
  "EDIT-TODO": { id: string; newTitle: string; newDesc: string };
  "EDIT-CATEGORY-TITLE": { id: string; newTitle: string };
  "REORDER-TODO": { categoryId: string; newTodos: Todo[] };
  "REORDER-CATEGORY": { id: string; dir: "up" | "down" };
  "CLEAR-TODO": null;
  "IMPORT-TODO": { newTodos: Todos };
};

export interface TodosAction<T extends ActionType = ActionType> {
  type: T;
  item: ItemByActionType[T];
}

export const reducer = (state: Todos, action: TodosAction) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case "ADD-TODO": {
        // Typescript SUCKS for not narrowing this down
        const { categoryId, newTodo } =
          action.item as ItemByActionType["ADD-TODO"];
        const categoryIndex = draft.data
          .map((todoCategory) => todoCategory.id)
          .indexOf(categoryId);

        if (categoryIndex < 0) return;

        draft.data[categoryIndex].todos.push({
          id: crypto.randomUUID(),
          status: "not-done",
          ...newTodo,
        });
        break;
      }

      case "ADD-CATEGORY": {
        const { title } = action.item as ItemByActionType["ADD-CATEGORY"];
        const newCategory = {
          id: crypto.randomUUID(),
          title,
          todos: [],
        };

        draft.data.push(newCategory);
        break;
      }

      case "DONE-TODO": {
        const { id } = action.item as ItemByActionType["DONE-TODO"];

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

        break;
      }

      case "DELETE-TODO": {
        const { id } = action.item as ItemByActionType["DELETE-TODO"];

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
            draft.data[categoryIndex].todos.splice(todoIndex, 1);
          }
        }
        break;
      }

      case "DELETE-CATEGORY": {
        const { id } = action.item as ItemByActionType["DELETE-CATEGORY"];

        const index = draft.data
          .map((todoCategory) => todoCategory.id)
          .indexOf(id);

        draft.data.splice(index, 1);

        break;
      }

      case "EDIT-TODO": {
        const { id, newTitle, newDesc } =
          action.item as ItemByActionType["EDIT-TODO"];

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

        break;
      }

      case "EDIT-CATEGORY-TITLE": {
        const { id, newTitle } =
          action.item as ItemByActionType["EDIT-CATEGORY-TITLE"];

        const index = draft.data
          .map((todoCategory) => todoCategory.id)
          .indexOf(id);

        draft.data[index].title = newTitle;

        break;
      }

      case "REORDER-TODO": {
        const { categoryId, newTodos } =
          action.item as ItemByActionType["REORDER-TODO"];

        const index = draft.data
          .map((todoCategory) => todoCategory.id)
          .indexOf(categoryId);

        draft.data[index].todos = newTodos;

        break;
      }

      case "REORDER-CATEGORY": {
        const { id, dir } = action.item as ItemByActionType["REORDER-CATEGORY"];

        const index = draft.data
          .map((todoCategory) => todoCategory.id)
          .indexOf(id);

        const [reorderingCategory] = draft.data.splice(index, 1);
        draft.data.splice(
          dir === "up" ? index - 1 : index + 1,
          0,
          reorderingCategory
        );

        break;
      }

      case "IMPORT-TODO": {
        const { newTodos } = action.item as ItemByActionType["IMPORT-TODO"];

        draft.data = newTodos.data;

        break;
      }

      case "CLEAR-TODO": {
        draft.data = [];
        break;
      }
    }
  });
};
