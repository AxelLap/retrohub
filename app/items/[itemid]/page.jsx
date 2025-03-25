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
import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { AnimatedLoader } from "@/components/animations/AnimatedLoader";
import { ImageInput } from "@/components/forms&inputs/ImageInput";
import { Button, buttonVariants } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CATEGORIES } from "@/lib/data/category-data";
import { CONDITIONS } from "@/lib/data/condition-data";
import { CONSTR } from "@/lib/data/constructor-data";
import { useUserStore } from "@/lib/store/use-user-store";
import { getItem } from "@/lib/supabase/items/get-item";
import { setItem } from "@/lib/supabase/items/set-item";
import { getId } from "@/lib/tools/get-id";
import { useFetchImageFile } from "@/lib/tools/useFetchImageFile";
import Link from "next/link";
import useSWR from "swr";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(0).max(500),
  category: z.string().min(2).max(50),
  constr: z.string().min(2).max(50),
  condition: z.string().min(2).max(50),
  price: z.coerce.number(),
  image: z.any(),
  userId: z.string(),
  userImage: z.string(),
});

export default function ItemIdPage({ params }) {
  const userName = useUserStore((s) => s.user);

  const [itemId, setItemId] = useState(null);

  useEffect(() => {
    async function resolveParams() {
      const resolvedParams = await params;
      setItemId(resolvedParams.itemid);
    }
    resolveParams();
  }, [params]);

  console.log(itemId);

  const { data, isLoading } = useSWR(
    itemId ? `/items/${itemId}` : null,
    async () => {
      if (itemId === "new") return null;

      return getItem(itemId);
    }
  );

  console.log({ data, isLoading, itemId });

  if (!userName) {
    return (
      <div className=" flex flex-col justify-center items-center w-full px-4 gap-3 ">
        <p className="text-red-500 text-center">
          This page is restricted to logged users only please login to your
          account first
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

  if (isLoading || itemId === null) {
    return <AnimatedLoader />;
  }

  return (
    <div className=" flex flex-col justify-center items-center w-full px-4 gap-3 ">
      <AddNewItemForm defaultItem={data} />
    </div>
  );
}

const AddNewItemForm = ({ defaultItem }) => {
  const userId = useUserStore((s) => s.user);
  const userImage = useUserStore((s) => s.userImage);

  const fileName = defaultItem.item[0].image.split("/").pop();
  console.log(fileName);
  const { data: imageFile } = useFetchImageFile(
    defaultItem.item[0].image,
    fileName
  );

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultItem
      ? {
          name: defaultItem.item[0].name,
          image: imageFile,
          description: defaultItem.item[0].description,
          category: defaultItem.item[0].category,
          constr: defaultItem.item[0].constr,
          condition: defaultItem.item[0].condition,
          price: defaultItem.item[0].price / 100,
          userId: defaultItem.item[0].userId,
          userImage: defaultItem.item[0].userImage,
        }
      : {
          name: "",
          description: "",
          category: "",
          constr: "",
          condition: "",
          price: 0,
          userId: "",
          userImage: "",
        },
  });

  useEffect(() => {
    if (imageFile) {
      console.log(imageFile);
      form.setValue("image", imageFile, { shouldValidate: true });
    }
  }, [imageFile, form]);

  function onSubmit(values) {
    const id = getId();
    setItem(id, {
      name: values.name,
      description: values.description,
      category: values.category,
      constr: values.constr,
      condition: values.condition,
      price: values.price,
      image: values.image,
      userId: userId,
      userImage: userImage,
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter item's description" {...field} />
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
            name="condition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>condition</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a condition" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem
                      value="select a condition"
                      disabled
                      className="text-gray-400"
                    >
                      Select a condition
                    </SelectItem>
                    {CONDITIONS.map((c) => (
                      <SelectItem
                        className="flex items-center gap-2"
                        value={c}
                        key={c}
                      >
                        <div className="flex items-center gap-2">
                          <p>{c}</p>
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
                  <ImageInput
                    currentImage={imageFile}
                    onChange={field.onChange}
                  />
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
