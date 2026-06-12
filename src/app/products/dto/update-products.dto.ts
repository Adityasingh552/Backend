import { z } from "zod";

export const updateProductDto = z.object({
  name: z
    .string()
    .min(1, "Product name is required")
    .max(255, "Product name must be 255 characters or less")
    .optional(),
  description: z.string().optional(),
  price: z
    .number({ error: "Price must be a number" })
    .positive("Price must be a positive number")
    .optional(),
  stock: z
    .number({ error: "Stock must be a number" })
    .int("Stock must be an integer")
    .min(0, "Stock cannot be negative")
    .optional(),
});

export type UpdateProductDto = z.infer<typeof updateProductDto>;
