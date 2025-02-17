"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ImageInput } from "@/components/ImageInput";
import { Button, buttonVariants } from "@/components/ui/button";
import { CATEGORIES } from "@/lib/category-data";
import { CONSTR } from "@/lib/constructor-data";
import { getId } from "@/lib/get-id";
import { setItem } from "@/lib/set-item";
import { useUserStore } from "@/lib/store/use-user-store";
import { Loader } from "lucide-react";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  category: z.string().min(2).max(50),
  constr: z.string().min(2).max(50),
  price: z.coerce.number(),
  image: z.any(),
});

export default function ItemIdPage() {
  const isAdmin = useUserStore((s) => s.isAdmin);
  const [isLoading, setIsLoading] = useState(false);

  if (!isAdmin) {
    return (
      <div className=" flex flex-col justify-center items-center w-full px-4 gap-3 ">
        <p className="text-red-500 text-center">
          This page is restricted to admin only please login with an admin
          acount
        </p>
        <Link
          className={buttonVariants({ size: "sm", variant: "secondary" })}
          href="/login"
        >
          Login
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 w-full h-full justify-center items-center m-10">
        <Loader className="animate-spin" />
        <span className="font-bold">Loading...</span>
      </div>
    );
  }

  return (
    <div className=" flex flex-col justify-center items-center w-full px-4 gap-3 ">
      <AddNewItemForm />
    </div>
  );
}

const AddNewItemForm = () => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      constr: "",
      price: 0,
    },
  });

  function onSubmit(values) {
    const id = getId(values.name);
    setItem(id, {
      name: values.name,
      category: values.category,
      constr: values.constr,
      price: values.price,
      image: values.image,
    });
    router.push("/");
  }

  return (
    <div className="w-full p-4">
      <h2 className="m-auto w-fit">Add an item to sell</h2>
      <Form {...form}>
        <form
          className="flex flex-col gap-4 m-auto w-full"
          onSubmit={form.handleSubmit(
            (values) => onSubmit(values),
            (errors) => console.log("❌ Erreurs de validation :", errors)
          )}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter item's name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem
                        className="flex items-center gap-2"
                        value={c.id}
                        key={c.id}
                      >
                        <div className="flex items-center gap-2">
                          <p>{c.name}</p>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="constr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Constructor</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a constructor" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CONSTR.map((c) => (
                      <SelectItem
                        className="flex items-center gap-2"
                        value={c.id}
                        key={c.id}
                      >
                        <div className="flex items-center gap-2">
                          <p>{c.name}</p>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter item's price"
                    type="number"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageInput image={field.value} onChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button className="w-full text-green-700" type="submit">
            Add Item
          </Button>
        </form>
      </Form>
    </div>
  );
};
