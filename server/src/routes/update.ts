// import { Router } from "express";
// import updateController from "../controllers/update";
// import { authorize } from "../middlewares/user";
// import validateSchema from "../middlewares/validator";
// import { createUpdateSchema } from "../validation/update";

// const router = Router();

// router.get("/", authorize({ isAdmin: true }), updateController.getAll);
// router.get("/:rentId", updateController.getByRentId);
// router.post(
//   "/",
//   authorize({}),
//   validateSchema(createUpdateSchema),
//   updateController.create
// );
// export default router;
