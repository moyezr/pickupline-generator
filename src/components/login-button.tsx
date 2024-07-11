"use client";
import GoogleIcon from "../../public/google.svg";

import React from "react";
import { Button } from "./ui/button";
import { login } from "@/actions/login";
import Image from "next/image";

type Props = {};

const LoginButton = (props: Props) => {
  return (
    <Button
      onClick={async () => await login()}
      className="flex justify-center items-center gap-4 self-center"
      variant={"secondary"}
    >
      <Image alt="Google Logo" src={GoogleIcon} width={20} />
      Sign up with google
    </Button>
  );
};

export default LoginButton;
