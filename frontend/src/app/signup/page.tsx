import React from "react";
import { Metadata } from "next";

import SignUp from "@/components/PageComponents/Signup";

export const metadata: Metadata = {
  title: 'Login | Nest.Js + Next.Js To-Do App',
  description:
    "Fullstack to-do app with Nest.Js, Next.Js, Postgres (Supabase)",
};

export default function SignUpPage(){
  return (
    <SignUp />
  );
}