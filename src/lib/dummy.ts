import { Todos } from "./type";

export const dummyTodos: Todos = {
  data: [
    {
      id: crypto.randomUUID(),
      title: "Cat 1",
      todos: [
        {
          id: crypto.randomUUID(),
          title: "Todo 1",
          status: "not-done",
        },
        {
          id: crypto.randomUUID(),
          title: "Todo 1",
          desc: "Todo 1 asdlwfql wflqfl lfqw flqwflq flw qlfwlq fwlq fwl wflwfqlf w/n sdadqw asdlwfql wflqfl lfqw flqwflq flw qlfwlq fwlq fwl wflwfqlf w/n sdadqw asdlwfql wflqfl lfqw flqwflq flw qlfwlq fwlq fwl wflwfqlf w/n sdadqw",
          status: "not-done",
        },
        {
          id: crypto.randomUUID(),
          title: "Todo 2",
          desc: "Todo 2 flqwflq flw qlfwlq fwlq fwl wflwfqlf w/n sdadqw asdlwfql wflqfl lfqw flqwflq flw qlfwlq fwlq fwl wflwfqlf w/n sdadqw",
          status: "not-done",
        },
        {
          id: crypto.randomUUID(),
          title: "Todo 3",
          desc: "Todo 2 flqwflq flw qlfwlq fwlq fwl wflwfqlf w/n sdadqw asdlwfql wflqfl lfqw flqwflq flw qlfwlq fwlq fwl wflwfqlf w/n sdadqw flqwflq flw qlfwlq fwlq fwl wflwfqlf w/n sdadqw asdlwfql wflqfl lfqw flqwflq flw qlfwlq fwlq fwl wflwfqlf w/n sdadq flqwflq flw qlfwlq fwlq fwl wflwfqlf w/n sdadqw asdlwfql wflqfl lfqw flqwflq flw qlfwlq fwlq fwl wflwfqlf w/n sdadq flqwflq flw qlfwlq fwlq fwl wflwfqlf w/n sdadqw asdlwfql wflqfl lfqw flqwflq flw qlfwlq fwlq fwl wflwfqlf w/n sdadq flqwflq flw qlfwlq fwlq fwl wflwfqlf w/n sdadqw asdlwfql wflqfl lfqw flqwflq flw qlfwlq fwlq fwl wflwfqlf w/n sdadq",
          status: "done",
        },
      ],
    },
    {
      id: crypto.randomUUID(),
      title: "Cat 2",
      todos: [
        {
          id: crypto.randomUUID(),
          title: "Todo 4",
          desc: "Todo 4 asdlwfql wflqfl lfqw flqwflq flw qlfwlq fwlq fwl wflwfqlf w/n sdadqw asdlwfql wflqfl lfqw flqwflq flw qlfwlq fwlq fwl wflwfqlf w/n sdadqw asdlwfql wflqfl lfqw flqwflq flw qlfwlq fwlq fwl wflwfqlf w/n sdadqw",
          status: "done",
        },
        {
          id: crypto.randomUUID(),
          title: "Todo 5",
          desc: "Todo 5 flqwflq flw qlfwlq fwlq fwl wflwfqlf w/n sdadqw asdlwfql wflqfl lfqw flqwflq flw qlfwlq fwlq fwl wflwfqlf w/n sdadqw",
          status: "not-done",
        },
      ],
    },
  ],
};
