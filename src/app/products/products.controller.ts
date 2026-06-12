import type { Request, Response } from "express";
import { ApiSuccessResponse } from "../../utils/index.js";
import { HttpStatus } from "../../constants/index.js";
import { logger } from "../../logger/logger.js";
import * as productService from "./products.service.js";

export const getAllProducts = async (
  _req: Request,
  res: Response
): Promise<void> => {
  logger.info("Controller: getAllProducts - entry");
  const products = await productService.getAllProducts();
  logger.info("Controller: getAllProducts - exit");
  new ApiSuccessResponse("Products retrieved successfully", products).send(
    res,
    HttpStatus.OK
  );
};

export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.params.id as string;
  logger.info("Controller: getProductById - entry", { id });
  const product = await productService.getProductById(id);
  logger.info("Controller: getProductById - exit", { id });
  new ApiSuccessResponse("Product retrieved successfully", product).send(
    res,
    HttpStatus.OK
  );
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  logger.info("Controller: createProduct - entry");
  const product = await productService.createProduct(req.body);
  logger.info("Controller: createProduct - exit", { id: product.id });
  new ApiSuccessResponse("Product created successfully", product).send(
    res,
    HttpStatus.CREATED
  );
};

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.params.id as string;
  logger.info("Controller: updateProduct - entry", { id });
  const product = await productService.updateProduct(id, req.body);
  logger.info("Controller: updateProduct - exit", { id });
  new ApiSuccessResponse("Product updated successfully", product).send(
    res,
    HttpStatus.OK
  );
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = req.params.id as string;
  logger.info("Controller: deleteProduct - entry", { id });
  await productService.deleteProduct(id);
  logger.info("Controller: deleteProduct - exit", { id });
  new ApiSuccessResponse("Product deleted successfully", null).send(
    res,
    HttpStatus.OK
  );
};
