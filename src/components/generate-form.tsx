"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchema } from "@/utils/formSchema";
import { Textarea } from "./ui/textarea";
import { Heart, Loader } from "lucide-react";
import generatePickupLine from "@/actions/generate";
import OpenAI from "openai";
import { useRouter } from "next/navigation";
const mock = (timeout = 5000) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};
export default function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
    },
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response: {
        status: number;
        message: string;
        data: OpenAI.Chat.Completions.ChatCompletion.Choice | null;
      } = await generatePickupLine(values);

      if (!response.data) {
        return;
      }

      console.log("Content", response?.data?.message?.content);
      const pickup_lines = response.data.message.content;

      localStorage.setItem("pickup_lines", JSON.stringify(pickup_lines));
      router.push("/pickup-lines");
    } catch (error) {
      console.log("Error generating pickup line", error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 grand-hotel-regular w-3/4 lg:w-1/2 mx-auto pt-16"
      >
        <FormField
          control={form.control}
          disabled={form.formState.isSubmitting}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-rose-800 text-xl md:text-3xl font-semibold">
                Tell us about your crush
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder={`She is a 10 but..
He likes football....
                    `}
                  className="resize-none text-base md:text-lg overflow-hidden h-32 disabled:opacity-60 disabled:cursor-not-allowed"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="style"
          disabled={form.formState.isSubmitting}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="grand-hotel-regular text-rose-800 font-semibold text-xl md:text-3xl">
                Style
              </FormLabel>
              <FormControl>
                <Input
                  className="text-base md:text-lg disabled:opacity-60 disabled:cursor-not-allowed"
                  placeholder="eg: Funny"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="grand-hotel-regular bg-rose-600  self-center text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-32 p-3 sm:p-4 md:p-6 lg:p-8 rounded-full flex gap-6 items-center text-white justify-center mx-auto disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {" "}
          {form.formState.isSubmitting ? (
            <Loader className="animate-spin text-white" />
          ) : (
            <>
              <Heart strokeWidth={0} fill="white" size={16} />
              Generate one for me
              <Heart strokeWidth={0} fill="white" size={16} />
            </>
          )}{" "}
        </Button>
      </form>
    </Form>
  );
}
