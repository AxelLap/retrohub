"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { useDialogStore } from "@/lib/store/use-user-dialog-store";
import { useUserStore } from "@/lib/store/use-user-store";
import { updateItems } from "@/lib/supabase/items/update-items";
import { setUser } from "@/lib/supabase/users/set-user";
import { updateUser } from "@/lib/supabase/users/update-user";
import { getId } from "@/lib/tools/get-id";
import { useFetchImageFile } from "@/lib/tools/useFetchImageFile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AnimatedLoader } from "../animations/AnimatedLoader";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ImageInput } from "./ImageInput";

const formSchema = z.object({
  userName: z.string().min(4).max(50),
  image: z.any(),
  userId: z.string(),
});

export const SignInForm = ({ defaultUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const login = useUserStore((s) => s.login);
  const closeModal = useDialogStore((s) => s.setIsDialogOpen);
  const setUserFormOpen = useDialogStore((s) => s.setUserFormOpen);
  const router = useRouter();

  // Utilisation de SWR pour récupérer l'image
  const fileName = defaultUser?.image?.split("/").pop();

  const { data: imageFile } = defaultUser
    ? useFetchImageFile(defaultUser?.image, fileName)
    : {};
  console.log("🖼️ imageFile:", imageFile);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultUser
      ? {
          userName: defaultUser.userName,
          image: imageFile,
          userId: defaultUser.userId,
        }
      : {
          userName: "",
          image: "",
          userId: "",
        },
  });

  // console.log("🔍 Form values à l'initialisation :", form.getValues());

  if (isLoading) {
    return <AnimatedLoader />;
  }

  // console.log("🛠 Form state errors:", form.formState.errors);

  async function onSubmit(values) {
    if (!defaultUser) {
      const id = getId();
      const newUser = await setUser(id, {
        userName: values.userName,
        image: values.image,
        userId: id,
      });
      login(newUser.userName, newUser.image);
      router.push("/");
    } else {
      const id = defaultUser.userId;
      const newUser = await updateUser(
        id,
        {
          userName: values.userName,
          image: values.image,
          userId: id,
        },
        defaultUser.image
      );
      updateItems(newUser, defaultUser.userName);
      login(newUser.userName, newUser.image);
      setUserFormOpen();
      closeModal();
    }
  }

  useEffect(() => {
    if (imageFile) {
      form.setValue("image", imageFile);
    }
  }, [imageFile]);

  return (
    <div>
      <Form {...form}>
        <form
          className="flex flex-col w-full gap-4 m-auto"
          onSubmit={form.handleSubmit((values) => {
            console.log("✅ handleSubmit validé avec :", values);
            onSubmit(values);
          })}
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
                  <ImageInput
                    currentImage={
                      imageFile instanceof File || imageFile instanceof Blob
                        ? imageFile
                        : null
                    }
                    onChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button className="w-full text-green-700" type="submit">
            validate
          </Button>
        </form>
      </Form>
    </div>
  );
};
