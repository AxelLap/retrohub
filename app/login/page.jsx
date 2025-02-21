"use client";

import { SignInForm } from "@/components/forms&inputs/signInForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/lib/store/use-user-store";
import { getUser } from "@/lib/supabase/users/get-user"; // Import de la fonction BDD
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const { login } = useUserStore();
  const router = useRouter();
  const [loginMode, setLoginMode] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin(formData) {
    setErrorMessage(""); // Réinitialise les erreurs
    const userName = formData.get("userName");

    // Vérifie si l'utilisateur existe dans la BDD
    const { user } = await getUser(userName);

    if (user && user.length > 0) {
      // Utilisateur trouvé, on l'ajoute au store avec son image
      login(user[0].userName, user[0].image);
      router.push("/");
    } else {
      // Utilisateur introuvable, retour au mode inscription
      setLoginMode(false);
      setErrorMessage("User not found. Please sign up.");
    }
  }

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
        {loginMode ? (
          <div className="flex flex-col gap-7">
            <p className="text-center">Please login to access the shop!</p>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <form action={handleLogin} className="flex w-full gap-4">
              <Input placeholder="Enter your name" name="userName"></Input>
              <Button type="submit">Login</Button>
            </form>
            <div className="flex flex-col gap-2">
              <p className="text-center">Don't have an account yet?</p>
              <Button onClick={() => setLoginMode(false)}>Sign up</Button>
            </div>
          </div>
        ) : (
          <SignInForm />
        )}
      </div>
    </div>
  );
}
