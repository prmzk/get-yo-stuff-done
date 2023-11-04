import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Todos } from "./type";

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
