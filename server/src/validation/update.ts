import { Schema } from "express-validator";

export const createUpdateSchema: Schema = {
  campaignId: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },

  content: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
};
