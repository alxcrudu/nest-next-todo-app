"use client";
import { Inter } from "next/font/google";
import { SnackbarProvider } from "notistack";
import { cn } from "@/utils/cn";
import BottomBanner from "@/components/BottomBanner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "min-h-screen")}>
        <SnackbarProvider
          maxSnack={3}
          preventDuplicate
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          {children}
        <BottomBanner />
        </SnackbarProvider>
      </body>
    </html>
  );
}
