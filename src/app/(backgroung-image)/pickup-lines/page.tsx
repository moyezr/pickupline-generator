"use client";

import React, { useEffect, useState } from "react";

import PickupLineCard from "@/components/pickupline-card";
import { Heart } from "lucide-react";
import Link from "next/link";
type Props = {};

const PickupLines = (props: Props) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  let pickup_lines: string[] = JSON.parse(
    localStorage.getItem("pickup_lines") as string
  );
  if (typeof pickup_lines === "string") {
    pickup_lines = JSON.parse(pickup_lines);
  }

  // console.log(pickup_lines);
  return (
    <div className="flex flex-col gap-6 items-center justify-center pt-12 overflow-x-hidden">
      <p className="grand-hotel-regular text-xl text-rose-800">
        Copy the below pick up lines
      </p>

      <div className="grid grid-cols-1 gap-y-6 px-8">
        {pickup_lines?.length > 0 &&
          pickup_lines.map((item, i) => (
            <PickupLineCard key={item} n={i + 1} text={item} />
          ))}
      </div>
      <Link
        href={"/generate"}
        type="submit"
        className="grand-hotel-regular bg-rose-600  self-center text-xl sm:text-2xl md:text-3xl lg:text-4xl py-4 px-6 hover:bg-rose-500/70 rounded-full flex gap-6 items-center text-white justify-center mx-auto"
      >
        {" "}
        <Heart strokeWidth={0} fill="white" size={16} />
        Regenerate Pickup Lines
        <Heart strokeWidth={0} fill="white" size={16} />
      </Link>
    </div>
  );
};

export default PickupLines;
