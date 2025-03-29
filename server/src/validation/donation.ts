import { Schema } from "express-validator";

export const createDonationSchema: Schema = {
  campaign: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  amount: {
    in: ["body"],
    isNumeric: true,
    notEmpty: true,
  },
  tip: {
    in: ["body"],
    isNumeric: true,
  },
  isAnonymous: {
    in: ["body"],
    isBoolean: true,
    default: false,
  },
};
