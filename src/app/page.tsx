import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
export default async function Home() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();


  return (
    <main className="h-screen w-screen bg-[url('/assets/background.svg')] bg-cover flex flex-col">
      <h1 className="text-center grand-hotel-regular text-white text-5xl leading-relaxed pt-[90px] pr-[33px] ">
        PickUp Line <br /> Generator
      </h1>
      <div className="flex justify-center">
        <Link
          href={!data.user ? "/login" : "/generate"}
          className="grand-hotel-regular bg-rose-600  self-center text-4xl mt-32 py-4 px-6 hover:bg-rose-500/70 rounded-full flex gap-6 items-center text-white justify-center"
        >
          <Heart strokeWidth={0} fill="white" size={16} />
          Generate one for me
          <Heart strokeWidth={0} fill="white" size={16} />
        </Link>
      </div>
    </main>
  );
}
