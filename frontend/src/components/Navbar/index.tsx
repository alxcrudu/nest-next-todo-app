"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import Nest from "@/assets/images/nest.svg";
import Next from "@/assets/images/next.svg";

import { UserInfo, getLoginInfo } from "@/utils/LoginInfo";

const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const token = localStorage?.getItem("token");
    if (token !== undefined) {
      const user = getLoginInfo();
      setUser(user);
    }
  }, []);

  return (
    <nav className="p-4">
      <div className="navbar navbar-center bg-base-100 rounded-md">
        <div className="flex-1">
          <div className="flex w-max gap-2">
            <Image src={Nest} width={30} height={30} alt="nest logo" />
            <Image src={Next} width={30} height={30} alt="next logo" />
          </div>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content rounded-full w-8">
                  <span className="text-xs uppercase">
                    {user?.email?.charAt(0) || null}
                  </span>
                </div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className="text-secondary mb-2">
                <small>{user?.email || "null"}</small>
              </li>
              <li>
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    setUser(null);
                    router.push("/login");
                  }}
                >
                  Log out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
