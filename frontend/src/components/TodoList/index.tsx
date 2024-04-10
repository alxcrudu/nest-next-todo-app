import React, { useRef, useState } from "react";
import axiosInstance from "@/axios/AxiosSetup";
import { ApiConstants } from "@/utils/ApiConstants";
import { getLoginInfo } from "@/utils/LoginInfo";
import { cn } from "@/utils/cn";
import { useSnackbar } from "notistack";
import { CiCircleCheck, CiCircleRemove, CiCircleInfo } from "react-icons/ci";

interface TodoListProps {
  id: number;
  todo: string;
  completed: boolean;
  markComplete: (id: number) => void;
  deleteTodo: (id: number) => void;
  getTodos: () => void;
}

const TodoList = (props: TodoListProps) => {
  const newTodo: any = useRef();
  const [editing, setEditing] = useState(false)
  const { enqueueSnackbar } = useSnackbar();

  const editTask = async () => {
    if (newTodo.current.value == "") {
      return enqueueSnackbar("Please enter your edited todo!", {
        variant: "info",
        style: { maxWidth: 400 },
      });
    }
    const userId = getLoginInfo()?.userId;
    if (userId != null) {
      await axiosInstance.patch(ApiConstants.TODO.EDIT(props.id), {
        todo: newTodo.current.value,
      });
      props.getTodos();
      newTodo.current.value = "";
      setEditing(false);
      enqueueSnackbar("Todo edited succesfully!", {
        variant: "success",
        style: { maxWidth: 400 },
      });
    } else {
      setEditing(false);
      enqueueSnackbar("Not authenticated!", {
        variant: "warning",
        style: { maxWidth: 400 },
      });
    }
  };

  if (!editing) return (
    <li className="flex card bg-base-100 shadow-xl p-4">
      <div className="select-none flex flex-1 items-center">
        <div
          className={cn(
            "font-medium flex-1",
            props.completed ? "line-through opacity-40" : ""
          )}
        >
          {props.todo}
        </div>
        <button
          onClick={() => setEditing(true)}
          className="text-blue-200"
        >
          <CiCircleInfo size={30} />
        </button>
        <button
          onClick={() => props.markComplete(props.id)}
          className="text-green-400"
        >
          <CiCircleCheck size={30} />
        </button>
        <button
          onClick={() => props.deleteTodo(props.id)}
          className="text-red-400"
        >
          <CiCircleRemove size={30} />
        </button>
      </div>
    </li>
  ) 
  return (
    <li className="flex flex-1 flex-row justify-between card bg-base-100 shadow-xl p-4">
      <input ref={newTodo} type="input" className="input input-bordered input-sm" placeholder={"Editing: " + props.todo} />
      <div>
      <button
          onClick={() => editTask()}
          className="text-green-400"
        >
          <CiCircleCheck size={30} />
        </button>
        <button
          onClick={() => setEditing(false)}
          className="text-red-400"
        >
          <CiCircleRemove size={30} />
        </button>
        </div>
    </li>
  );
};

export default TodoList;
