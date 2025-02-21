"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { useUserStore } from "@/lib/store/use-user-store";
import { getId } from "@/lib/tools/get-id";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { setUser } from "../../lib/supabase/users/set-user";
import { AnimatedLoader } from "../animations/AnimatedLoader";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ImageInput } from "./ImageInput";

const formSchema = z.object({
  userName: z.string().min(4).max(50),
  image: z.any(),
  userId: z.string(),
});

export const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const login = useUserStore((s) => s.login);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      image: "",
      userId: "",
    },
  });

  if (isLoading) {
    return <AnimatedLoader />;
  }

  function onSubmit(values) {
    const id = getId();
    setUser(id, {
      userName: values.userName,
      image: values.image,
      userId: id,
    });
    login(values.userName);
    router.push("/");
  }

  return (
    <div>
      <p className="text-center">
        Please create an account to access to the shop !
      </p>
      <Form {...form}>
        <form
          className="flex flex-col w-full gap-4 m-auto"
          onSubmit={form.handleSubmit((values) => onSubmit(values))}
        >
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your name"
                    name="userName"
                    {...field}
                  ></Input>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>profile Picture</FormLabel>
                <FormControl>
                  <ImageInput image={field.value} onChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button className="w-full text-green-700" type="submit">
            sign in
          </Button>
        </form>
      </Form>
    </div>
  );
};
