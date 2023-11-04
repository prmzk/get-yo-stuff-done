export interface Todo {
  id: string;
  title: string;
  desc?: string;
  status: "done" | "not-done";
}

export interface TodoCategory {
  id: string;
  title: string;
  todos: Todo[];
}

export interface Todos {
  data: TodoCategory[];
}
