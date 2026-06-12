import { z } from "zod";

export const createProductDto = z.object({
  name: z
    .string()
    .min(1, "Product name is required")
    .max(255, "Product name must be 255 characters or less"),
  description: z.string().optional(),
  price: z
    .number({ error: "Price must be a number" })
    .positive("Price must be a positive number"),
  stock: z
    .number({ error: "Stock must be a number" })
    .int("Stock must be an integer")
    .min(0, "Stock cannot be negative")
    .default(0),
});

export type CreateProductDto = z.infer<typeof createProductDto>;
