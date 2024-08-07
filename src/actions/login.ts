"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.SITE_URL}/auth/callback`,
    },
  });

  console.log("SITE_URL", process.env.SITE_URL);

  console.log("Data Url", data.url);

  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }
}
