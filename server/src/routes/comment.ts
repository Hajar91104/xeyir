import { Router } from "express";
import reviewController from "../controllers/comment";
import { authorize } from "../middlewares/user";
import validateSchema from "../middlewares/validator";
import { changeStatusSchema } from "../validation/comment";
import { createCommentSchema } from "../validation/comment";

const router = Router();

router.get("/", authorize({ isAdmin: true }), reviewController.getAll);
router.get("/user/:userId", reviewController.getByUserId);
router.get("/donation/:donationId", reviewController.getByDonationId);

router.post(
  "/",
  authorize({}),
  validateSchema(createCommentSchema),
  reviewController.create
);
router.patch(
  "/:id/change-status",
  authorize({ isAdmin: true }),
  validateSchema(changeStatusSchema),
  reviewController.changeStatus
);
export default router;
