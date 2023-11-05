import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Todo, TodoCategory, Todos } from "./type";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const setLocalStorageTodo = (value: Todos) => {
  const stringifiedValue = JSON.stringify(value);
  window.localStorage.setItem("todos", stringifiedValue);
  window.dispatchEvent(new Event("storage"));
};

export const getLocalStorageTodo = () => {
  return window.localStorage.getItem("todos") ?? '{"data":[]}';
};

// Type guard for 'Todos'
export function isSatisfiesTodoType(data: unknown): data is Todos {
  return (
    typeof data === "object" &&
    (data || false) &&
    "data" in data &&
    Array.isArray(data.data) &&
    data.data.every((category: unknown) => isTodoCategory(category))
  );
}

// Type guard for 'TodoCategory'
function isTodoCategory(data: unknown): data is TodoCategory {
  return (
    typeof data === "object" &&
    (data || false) &&
    "id" in data &&
    "title" in data &&
    "todos" in data &&
    Array.isArray(data.todos) &&
    data.todos.every((todo: unknown) => isTodo(todo))
  );
}

// Type guard for 'Todo'
function isTodo(data: unknown): data is Todo {
  return (
    typeof data === "object" &&
    (data || false) &&
    "id" in data &&
    "title" in data &&
    "status" in data &&
    (data.status === "done" || data.status === "not-done")
    // Add more checks for 'desc' if needed
  );
}
