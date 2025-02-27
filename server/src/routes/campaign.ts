import { Router } from "express";
import campaignController from "../controllers/campaign";
import validateSchema from "../middlewares/validator";
import {
  changeStatusSchema,
  createCampaignSchema,
  editCampaignSchema,
  getAllCampaignsSchema,
} from "../validation/campaign";
import { authorize } from "../middlewares/user";
import upload from "../middlewares/multer";

const router = Router();

router.get(
  "/",
  validateSchema(getAllCampaignsSchema),
  campaignController.getAll
);
router.get("/:id", campaignController.getById);
router.get("/user/:userId", campaignController.getByUserId);

router.post(
  "/",
  authorize({}),
  upload.array("images", 8),
  validateSchema(createCampaignSchema),
  campaignController.create
);
router.put(
  "/:id",
  authorize({}),
  upload.array("images", 8),
  validateSchema(editCampaignSchema),
  campaignController.edit
);
router.patch(
  "/:id/change-status",
  authorize({ isAdmin: true }),
  validateSchema(changeStatusSchema),
  campaignController.changeStatus
);

router.delete("/:id", authorize({}), campaignController.remove);
export default router;
