"use server";

import OpenAI from "openai";
import { formSchema } from "@/utils/formSchema";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/utils/supabase/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function generatePickupLine(
  data: z.infer<typeof formSchema>
): Promise<{
  message: string;
  status: number;
  data: OpenAI.Chat.Completions.ChatCompletion.Choice | null;
}> {
  const validation = formSchema.safeParse(data);
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    redirect("/login");
    return {
      status: 401,
      message: "Unauthorized",
      data: null,
    };
  }


  if (!validation.success) {
    return {
      message: "Invalid Data format",
      status: 401,
      data: null,
    };
  }

  const completions = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are skilled in rizzing girls with pickup lines. I will give you a little description about my crush and a style. Your job is to give me two pickup lines in the form of a javascript array of strings

          Description: ${data.description}
          Style: ${data.style}

          Example Output: [
          "<Pickup line 1>",
          "<Pickup line 2>"
          ]
        `,
      },
    ],
    model: "gpt-3.5-turbo",
    response_format: {
      type: "text",
    },
  });

  const pickup_lines = completions.choices[0];

  // supabase
  //   .from("pickup_lines")
  //   .insert({
  //     lines: pickup_lines,
  //     user_id: user.user.id,
  //   })
  //   .then(() => console.log("updated in database"))
  //   .then(() => console.log("updated"));

  return {
    status: 200,
    message: "Success",
    data: pickup_lines,
  };
}
