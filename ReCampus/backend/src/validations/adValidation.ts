import { z } from "zod";

export const adSchema = z.object({
  title: z.string().min(3, "Título obrigatório"),
  description: z.string().min(10, "Descrição muito curta"),
  category: z.string().min(2),
  condition: z.string().min(2),
  location: z.string().min(2),
  price: z.number().nonnegative(),
  imageUrl: z.string().url(),
  isDonation: z.boolean()
});