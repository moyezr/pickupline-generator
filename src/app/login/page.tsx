

import { Heart } from "lucide-react";
import React from "react";

import LoginButton from "@/components/login-button";

type Props = {};

const LoginPage = (props: Props) => {
  return (
    <main className="flex flex-col justify-center gap-6 align-center h-screen w-screen text-center pb-24">
      <div className="bg-rose-600 p-4 self-center rounded-2xl">
        <Heart fill="white" size={32} strokeWidth={0} />
      </div>
      <h1 className="text-lg font-semibold pt-4">Pickup line generator</h1>
      <h3 className="text-slate-500">
        Generate pickup line for your crush now!
      </h3>
      <LoginButton />
    </main>
  );
};

export default LoginPage;
