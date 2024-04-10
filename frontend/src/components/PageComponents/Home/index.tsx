/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "@/axios/AxiosSetup";
import { getLoginInfo } from "@/utils/LoginInfo";
import { ApiConstants } from "@/utils/ApiConstants";
import TodoList from "@/components/TodoList";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import Navbar from "@/components/Navbar";

interface TodoModel {
  todo: string;
  id: number;
  completed: boolean;
}

const Home: React.FC = () => {
  const [todos, setTodos] = useState<TodoModel[]>([]);
  const todo: any = useRef();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  useEffect(() => {
    if (todos.length == 0) getTodos();
    const token = localStorage?.getItem("token");
    if (token == undefined) {
      return router.push("/login");
    }
  }, []);

  const getTodos = async () => {
    const userId = getLoginInfo()?.userId;
    if (userId != null) {
      const response = await axiosInstance.get(ApiConstants.TODO.GET_ALL());
      setTodos(response.data);
    } else {
      enqueueSnackbar("Not authenticated!", {
        variant: "warning",
        style: { maxWidth: 400 },
      });
    }
  };

  const saveTodo = async () => {
    if (todo.current.value == "") {
      return enqueueSnackbar("Please enter your todo!", {
        variant: "info",
        style: { maxWidth: 400 },
      });
    }
    const userId = getLoginInfo()?.userId;
    if (userId != null) {
      await axiosInstance.post(ApiConstants.TODO.ADD(), {
        todo: todo.current.value,
      });
      getTodos();
      todo.current.value = "";
      enqueueSnackbar("Todo added succesfully!", {
        variant: "success",
        style: { maxWidth: 400 },
      });
    } else {
      enqueueSnackbar("Not authenticated!", {
        variant: "warning",
        style: { maxWidth: 400 },
      });
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <div className="container mb-2 flex mx-auto w-full items-center justify-center">
          <div className="flex flex-col p-4">
            <div className="flex gap-2 mb-8">
              <input
                ref={todo}
                className="input input-bordered w-full"
                placeholder="Enter todo:"
              ></input>
              <button onClick={saveTodo} className="btn btn-neutral min-w-20">
                Add
              </button>
            </div>

            <ul className="grid gap-2">
              {todos
                .sort((a, b) =>
                  a.completed === b.completed ? 0 : a.completed ? 1 : -1
                )
                .map((todo) => {
                  return (
                    <TodoList
                      key={todo.id}
                      deleteTodo={async () => {
                        await axiosInstance.delete(
                          ApiConstants.TODO.DELETE(todo.id)
                        );
                        getTodos();
                        enqueueSnackbar("Todo deleted succesfully!", {
                          variant: "success",
                          style: { maxWidth: 400 },
                        });
                      }}
                      markComplete={async () => {
                        await axiosInstance.patch(
                          ApiConstants.TODO.MARK_COMPLETE(todo.id),
                          {}
                        );
                        getTodos();
                        enqueueSnackbar("Todo marked complete!", {
                          variant: "success",
                          style: { maxWidth: 400 },
                        });
                      }}
                      id={todo.id}
                      todo={todo.todo}
                      completed={todo.completed}
                      getTodos={getTodos}
                    ></TodoList>
                  );
                })}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
