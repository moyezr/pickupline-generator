import SignoutButton from "@/components/signout-button";
import Link from "next/link";
import React, { ReactNode } from "react";

const BackgroundImageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-[url('/assets/background.svg')] min-h-screen w-screen bg-cover bg-center py-8 relative">
      <div className="absolute inset-0 w-screen h-full bg-white bg-opacity-75 z-0" />
      <main className="relative z-10 sm:px-16 md:px-24 lg:px-32">
        <header className="w-full grid grid-cols-3 px-8 ">
          <div />
          <Link href={"/"}>
            <h1 className="flex-1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-rose-500 font-semibold text-center grand-hotel-regular ">
              Pickup Line Generator
            </h1>
          </Link>
          <SignoutButton />
        </header>

        {children}
      </main>
    </div>
  );
};

export default BackgroundImageLayout;
