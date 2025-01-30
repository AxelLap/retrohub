"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/lib/store/use-user-store";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Login() {
  const login = useUserStore((state) => state.login);
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 h-full w-full relative p-7">
      <div className="absolute top-0 left-0 -rotate-6">
        <Image
          src="/assets/snes_controller_logo.png"
          alt="logo"
          height={90}
          width={90}
        />
      </div>
      <div className="absolute -bottom-[3.5rem] left-0 -rotate-6">
        <Image
          src="/assets/PS1_ctrlr-logo-removebg-preview.png"
          alt="logo"
          height={70}
          width={70}
        />
      </div>
      <div className="absolute top-0 right-2 rotate-6">
        <Image
          src="/assets/dreamcast_ctrlr_logo.png"
          alt="logo"
          height={50}
          width={50}
        />
      </div>
      <div className="absolute -bottom-[3.5rem] right-0 rotate-6">
        <Image
          src="/assets/nes_ctrlr_logo.png"
          alt="logo"
          height={100}
          width={100}
        />
      </div>
      <div className="flex flex-col gap-4 w-3/4 h-fit m-auto items-center">
        <h2 className="text-2xl">Welcome to RetroHub</h2>
        <p>Please login to access the shop !</p>
        <form
          action={(formData) => {
            const userName = formData.get("userName");
            login(userName);
            router.push("/");
          }}
          className="flex w-full gap-4"
        >
          <Input placeholder="Enter your name" name="userName"></Input>
          <Button type="submit">login</Button>
        </form>
      </div>
    </div>
  );
}
