"use client";

import React from "react";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";

type Props = {};
const SignoutButton = (props: Props) => {
  const supabase = createClient();

  const router = useRouter();
  const { toast} = useToast();
  async function signOut() {
    const { error } = await supabase.auth.signOut({
      scope: "global"
    });

    if (error) {
      router.push("/auth/auth-error-code");
    } else {
      toast({
        title: "Signed Out!",
        style: {
          backgroundColor: "#f43f5e",
          color: "white",
          fontFamily: '"Grand Hotel", cursive;'
        }
      });
    }
    router.push("/")
  }

  return (
    <Button
      onClick={signOut}
      className="bg-rose-100 text-rose-700 grand-hotel-regular px-4  md:px-8 py-2  md:py-4 text-lg sm:text-xl md:text-2xl lg:text-3xl rounded-full hover:bg-rose-300/80 place-self-end"
    >
      Signout
    </Button>
  );
};

export default SignoutButton;
