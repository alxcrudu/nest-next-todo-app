import React from "react";
import { Metadata } from "next";

import Home from "@/components/PageComponents/Home";

export const metadata: Metadata = {
  title:
    process.env.NODE_ENV === "production"
      ? "[PROD] Nest.Js + Next.Js To-Do App"
      : "[DEV] Nest.Js + Next.Js To-Do App",
  description:
    "Fullstack To-Do App with Nest.Js, Next.Js, Postgres, TypeORM, Docker",
};

export default function HomePage() {
  return <Home />;
}
