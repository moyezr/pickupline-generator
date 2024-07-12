import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
export default async function Home() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  return (
    <main className="h-screen w-full bg-[url('/assets/background.svg')]  bg-cover bg-center bg-no-repeat flex flex-col space-y-52  md:space-y-48">
      <h1 className="text-center grand-hotel-regular text-white text-3xl sm:text-3xl md:text-4xl lg:text-5xl leading-relaxed pt-32 sm:pt-36 md:pt-42 lg:pt-[30px] pr-[33px] ">
        PickUp Line <br /> Generator
      </h1>

      <Link
        href={!data.user ? "/login" : "/generate"}
        className="grand-hotel-regular bg-rose-600  self-center  text-xl sm:text-2xl md:text-3xl lg:text-4xl py-4 px-6 hover:bg-rose-500/70 rounded-full flex gap-6 items-center text-white justify-center"
      >
        <Heart strokeWidth={0} fill="white" size={16} />
        Generate one for me
        <Heart strokeWidth={0} fill="white" size={16} />
      </Link>
    </main>
  );
}
