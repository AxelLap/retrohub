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
import { setUser } from "@/lib/supabase/users/set-user";
import { updateUser } from "@/lib/supabase/users/update-user";
import { getId } from "@/lib/tools/get-id";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { z } from "zod";
import { AnimatedLoader } from "../animations/AnimatedLoader";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ImageInput } from "./ImageInput";

// 🆕 Fonction locale pour récupérer l'image sous forme de File
const useFetchImageFile = (imageUrl, fileName) => {
  return useSWR(
    imageUrl,
    async () => {
      if (!imageUrl) return null;
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      return new File([blob], fileName, { type: blob.type });
    },
    { revalidateOnFocus: false }
  );
};

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
  const fileName = defaultUser.image.split("/").pop();
  const { data: imageFile } = useFetchImageFile(defaultUser?.image, fileName);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: defaultUser?.userName || "",
      image: imageFile || "",
      userId: defaultUser?.userId || "",
    },
  });

  // console.log("🔍 Form values à l'initialisation :", form.getValues());

  if (isLoading) {
    return <AnimatedLoader />;
  }

  useEffect(() => {
    if (imageFile) {
      form.setValue("image", imageFile, { shouldValidate: true });
    }
  }, [imageFile, form]);

  // console.log("🛠 Form state errors:", form.formState.errors);

  async function onSubmit(values) {
    console.log("submit");
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
      login(newUser.userName, newUser.image);
      setUserFormOpen();
      closeModal();
    }
  }

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
                    currentImage={imageFile}
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
