import {
  get_all_Products,
  tourDelete,
  tourPost,
  tourUpdate,
  singleProduct,
} from "../controller/tour.controller.js";
import express from "express";
import Tours from "../models/tours.model.js";
const router = express.Router();

router.get("/", get_all_Products);
router.get("/:id", singleProduct);
router.post("/", tourPost);
router.put("/:id", tourUpdate);
router.delete("/:id", tourDelete);

export default router;
