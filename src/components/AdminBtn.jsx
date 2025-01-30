"use client";

import { useUserStore } from "@/lib/store/use-user-store";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

export const AdminBtn = () => {
  const isAdmin = useUserStore((s) => s.isAdmin);
  if (isAdmin) {
    return (
      <div className="w-fit h-fit bg-blue-500 position absolute">
        <Link className={buttonVariants({ size: "sm" })} href="/items/new">
          Add New
        </Link>
      </div>
    );
  } else {
    return null;
  }
};
