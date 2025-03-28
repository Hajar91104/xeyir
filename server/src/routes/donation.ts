import { Router } from "express";
import donationController from "../controllers/donation";
import { authorize } from "../middlewares/user";
import validateSchema from "../middlewares/validator";
import { createDonationSchema } from "../validation/donation";

const router = Router();

router.get("/", authorize({}), donationController.getAll);
router.post(
  "/",
  authorize({}),
  validateSchema(createDonationSchema),
  donationController.create
);
router.get("/user/:userId", donationController.getByUserId);

export default router;
