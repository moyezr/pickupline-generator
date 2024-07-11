import { z } from "zod";

export const formSchema = z.object({
  description: z.string().min(2).max(100),
  style: z.string().min(2).max(50)
});
