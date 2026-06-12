import { Router } from "express";
import { asyncHandler } from "../../utils/index.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createProductDto } from "./dto/create-products.dto.js";
import { updateProductDto } from "./dto/update-products.dto.js";
import * as productController from "./products.controller.js";

const router = Router();

router.get("/", asyncHandler(productController.getAllProducts));

router.get("/:id", asyncHandler(productController.getProductById));

router.post(
  "/",
  validate({ body: createProductDto }),
  asyncHandler(productController.createProduct)
);

router.put(
  "/:id",
  validate({ body: updateProductDto }),
  asyncHandler(productController.updateProduct)
);

router.delete("/:id", asyncHandler(productController.deleteProduct));

export const productRoutes = router;
