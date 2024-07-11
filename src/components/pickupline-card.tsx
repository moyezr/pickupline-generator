"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Copy } from "lucide-react";
type Props = {
  n: number;
  text: string;
};

const PickupLineCard = ({ n, text }: Props) => {
  const { toast } = useToast();

  const copyHandler = () => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Pickup Line Copied!",
      description: "Happy Rizzing!",
      style: {
        backgroundColor: "#f43f5e",
        color: "white",
        fontFamily: '"Grand Hotel", cursive;'
      }
    });
  };

  return (
    <Card className="grand-hotel-regular border-2 border-rose-500">
      <CardHeader>
        <CardTitle className="text-rose-800 font-light">
          <div className="flex justify-between items-center ">
            <span>Pickup Line #{n}</span>
            <Copy
              onClick={copyHandler}
              className="text-rose-800 opacity-30 cursor-pointer"
            />
          </div>{" "}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-rose-400 text-xl tracking-wide">
        <p>{text}</p>
      </CardContent>
    </Card>
  );
};

export default PickupLineCard;
