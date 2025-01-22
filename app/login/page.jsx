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
    <main className="flex mt-4 flex-col gap-4 justify-center items-center font-[family-name:var(--font-geist-sans)]">
      <div className="h-fit flex flex-col justify-center items-center pt-10 pb-10 w-4/5 p-4 gap-3 relative">
        <div className="absolute top-0 -left-10 -rotate-6">
          <Image
            src="/assets/snes_controller_logo.png"
            alt="logo"
            height={90}
            width={90}
          />
        </div>
        <div className="absolute -bottom-8 -left-10 -rotate-6">
          <Image
            src="/assets/PS1_ctrlr-logo-removebg-preview.png"
            alt="logo"
            height={70}
            width={70}
          />
        </div>
        <div className="absolute top-0 -right-10 rotate-6">
          <Image
            src="/assets/dreamcast_ctrlr_logo.png"
            alt="logo"
            height={50}
            width={50}
          />
        </div>
        <div className="absolute -bottom-8 -right-10 rotate-6">
          <Image
            src="/assets/nes_ctrlr_logo.png"
            alt="logo"
            height={100}
            width={100}
          />
        </div>

        <h2 className="text-2xl">Welcome to RetroHub</h2>
        <p>Please login to access the shop !</p>
        <form
          action={(formData) => {
            const userName = formData.get("userName");
            login(userName);
            router.push("/");
          }}
          className="flex w-full"
        >
          <Input placeholder="Enter your name" name="userName"></Input>
          <Button type="submit">login</Button>
        </form>
      </div>
    </main>
  );
}
