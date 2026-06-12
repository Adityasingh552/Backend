import { eq } from "drizzle-orm";
import { db } from "../../config/database.js";
import { products } from "./products.schema.js";
import type { CreateProductDto } from "./dto/create-products.dto.js";
import type { UpdateProductDto } from "./dto/update-products.dto.js";
import { NotFoundError } from "../../utils/index.js";
import { logger } from "../../logger/logger.js";

export const getAllProducts = async () => {
  logger.info("Service: getAllProducts - entry");
  const result = await db.select().from(products);
  logger.info("Service: getAllProducts - exit", { count: result.length });
  return result;
};

export const getProductById = async (id: string) => {
  logger.info("Service: getProductById - entry", { id });
  const result = await db.select().from(products).where(eq(products.id, id));

  if (result.length === 0) {
    logger.warn("Service: getProductById - product not found", { id });
    throw new NotFoundError(`Product with id '${id}' not found`);
  }

  logger.info("Service: getProductById - exit", { id });
  return result[0];
};

export const createProduct = async (data: CreateProductDto) => {
  logger.info("Service: createProduct - entry", { data });
  const result = await db
    .insert(products)
    .values({
      name: data.name,
      description: data.description,
      price: data.price.toString(),
      stock: data.stock,
    })
    .returning();

  logger.info("Service: createProduct - exit", { id: result[0].id });
  return result[0];
};

export const updateProduct = async (id: string, data: UpdateProductDto) => {
  logger.info("Service: updateProduct - entry", { id, data });

  // Verify the product exists first
  await getProductById(id);

  const updateData: Record<string, unknown> = {};
  if (data.name !== undefined) updateData.name = data.name;
  if (data.description !== undefined) updateData.description = data.description;
  if (data.price !== undefined) updateData.price = data.price.toString();
  if (data.stock !== undefined) updateData.stock = data.stock;

  const result = await db
    .update(products)
    .set(updateData)
    .where(eq(products.id, id))
    .returning();

  logger.info("Service: updateProduct - exit", { id });
  return result[0];
};

export const deleteProduct = async (id: string) => {
  logger.info("Service: deleteProduct - entry", { id });

  // Verify the product exists first
  await getProductById(id);

  await db.delete(products).where(eq(products.id, id));

  logger.info("Service: deleteProduct - exit", { id });
};
