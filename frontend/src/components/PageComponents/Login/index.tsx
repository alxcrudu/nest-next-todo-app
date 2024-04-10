"use client";
import React, { useRef } from "react";
import { ApiConstants } from "@/utils/ApiConstants";
import axiosInstance from "@/axios/AxiosSetup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";

const Login: React.FC = () => {
  let email: any = useRef();
  let password: any = useRef();

  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const login = async () => {
    if (email.current.value == "" || password.current.value == "") {
      return enqueueSnackbar("Please fill the information", {
        variant: "warning",
        style: { maxWidth: 400 },
      });
    }
    try {
      const response = await axiosInstance.post(ApiConstants.LOGIN, {
        email: email.current.value,
        password: password.current.value,
      });
      localStorage.setItem("token", response.data.token);
      dispatchEvent(new Event("storage"));
      router.push("/");
    } catch (error: any) {
      if (error.response.status == 401)
        enqueueSnackbar(error.response.data.message, {
          variant: "warning",
          style: { maxWidth: 400 },
        });
      console.log(error);
    }
  };

  return (
    <main className="flex items-center justify-center pt-12">
      <div className="w-full max-w-md">
        <div className="flex justify-center  lg:w-auto w-full lg:border-b-0 pl-6 pr-2 border-solid border-b-2 border-gray-300 pb-5 lg:pb-0">
          <div className=" w-full flex items-center flex-shrink-0 mr-16"></div>
        </div>
        <div className="bg-base-100 shadow-lg rounded px-12 pt-6 pb-8 mb-4">
          {/* @csrf */}

          <div className="mb-4">
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                ref={email}
                className=""
                name="email"
                v-model="form.email"
                type="email"
                placeholder="Email"
              />
            </label>
          </div>
          <div className="mb-6">
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                ref={password}
                v-model="form.password"
                type="password"
                placeholder="Password"
                name="password"
                autoComplete="current-password"
              />
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button onClick={login} className="btn">
              Login
            </button>
            <Link href={"/signUp"}>Sign up</Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
