"use client";
import React from "react";
import { ApiConstants } from "@/utils/ApiConstants";
import axiosInstance from "@/axios/AxiosSetup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";

const SignUp: React.FC = () => {
  const router = useRouter();

  let firstName: any = React.useRef();
  let lastName: any = React.useRef();
  let password: any = React.useRef();
  let confirmPassword: any = React.useRef();
  let email: any = React.useRef();

  const { enqueueSnackbar } = useSnackbar();

  const register = async () => {
    if (password.current.value != confirmPassword.current.value) {
      return enqueueSnackbar("Password does not match!", {
        variant: "error",
        style: { maxWidth: 400 },
      });
    }

    await axiosInstance.post(ApiConstants.USER.SIGN_UP, {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      email: email.current.value,
      password: password.current.value,
    });
    enqueueSnackbar("Account Created Sucessfully!", {
      variant: "success",
      style: { maxWidth: 400 },
    });

    router.push("/login");
  };

  return (
    <main className="flex items-center justify-center pt-12">
      {/* Container */}
      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12">
          {/* Row */}
          <div className="w-full  border-black xl:w-3/4 lg:w-11/12 flex">
            {/* Col */}
            {/* Col */}
            <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
              <h3 className="pt-4 text-2xl text-center">Create an Account!</h3>
              <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="firstName"
                    >
                      First Name
                    </label>
                    <input
                      ref={firstName}
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="firstName"
                      type="text"
                      placeholder="First Name"
                    />
                  </div>
                  <div className="md:ml-2">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="lastName"
                    >
                      Last Name
                    </label>
                    <input
                      ref={lastName}
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="lastName"
                      type="text"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    ref={email}
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Email"
                  />
                </div>
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      ref={password}
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="password"
                      type="password"
                      placeholder="******************"
                    />
                    {/* <p className="text-xs italic text-red-500">Please choose a password.</p> */}
                  </div>
                  <div className="md:ml-2">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="c_password"
                    >
                      Confirm Password
                    </label>
                    <input
                      ref={confirmPassword}
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="c_password"
                      type="password"
                      placeholder="******************"
                    />
                  </div>
                </div>
                <div className="mb-6 text-center">
                  <button
                    onClick={register}
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Register Account
                  </button>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center"></div>
                <div className="text-center">
                  <Link href={"/login"}>Already have an account? Login!</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
