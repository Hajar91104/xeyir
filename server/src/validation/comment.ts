import { Schema } from "express-validator";

export const createCommentSchema: Schema = {
  campaign: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  donation: {
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

export const changeStatusSchema: Schema = {
  status: {
    in: ["body"],
    isString: true,
    notEmpty: true,
    isIn: {
      options: [["approved", "rejected"]],
    },
  },
};
