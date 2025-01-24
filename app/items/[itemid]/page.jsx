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
//UI Components

//Hooks
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

//DATAS
import { CATEGORIES } from "@/lib/category-data";

const formSchema = z.object({
  id: z.string().min(2).max(50),
  name: z.string().min(2).max(50),
  category: z.string().min(2).max(50),
  constructor: z.string().min(2).max(50),
});

function onSubmit(values) {
  const id = "AZERTY12";
  console.log(id, {
    name: values.name,

    category: values.category,
    constructor: values.constructor,
  });
}

export default function ItemIdPage() {
  return (
    <main className="flex mt-4 flex-col gap-4 justify-center items-center font-[family-name:var(--font-geist-sans)]">
      <div className=" flex flex-col justify-center items-center pt-10 pb-10 w-full p-4 gap-3 relative">
        <AddNewItemForm />
      </div>
    </main>
  );
}

const AddNewItemForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      constructor: "",
    },
  });
  return (
    <Form {...form}>
      <h2 className="m-auto p-4">Add an item to sell</h2>
      <form
        className="flex flex-col gap-4 m-auto"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          controll={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a constructor" />
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
      </form>
    </Form>
  );
};
