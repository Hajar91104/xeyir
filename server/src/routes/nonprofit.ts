import { Router } from "express";
import nonprofitController from "../controllers/nonprofit";
import validateSchema from "../middlewares/validator";
import {
  changeStatusSchema,
  createNonprofitSchema,
  getAllNonprofitsSchema,
} from "../validation/nonprofit";
import { authorize } from "../middlewares/user";
import upload from "../middlewares/multer";

const router = Router();

router.get(
  "/",
  validateSchema(getAllNonprofitsSchema),
  nonprofitController.getAll
);
router.get("/:id", nonprofitController.getById);
router.post(
  "/",
  authorize({ isAdmin: true }),
  upload.array("images", 8),
  validateSchema(createNonprofitSchema),
  nonprofitController.create
);

router.delete("/:id", authorize({ isAdmin: true }), nonprofitController.remove);
router.patch(
  "/:id/change-status",
  authorize({ isAdmin: true }),
  validateSchema(changeStatusSchema),
  nonprofitController.changeStatus
);
export default router;
