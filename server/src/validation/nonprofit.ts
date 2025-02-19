import { Schema } from "express-validator";
import mongoose from "mongoose";

export const getAllNonprofitsSchema: Schema = {
  take: {
    in: ["query"],
    isNumeric: true,
    optional: true,
  },
  skip: {
    in: ["query"],
    isNumeric: true,
    optional: true,
  },
  search: {
    in: ["query"],
    isString: true,
    optional: true,
  },
};

export const createNonprofitSchema: Schema = {
  title: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  description: {
    in: ["body"],
    isString: true,
    optional: true,
  },
  address: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  causes: {
    in: ["body"],
    isString: true,
    optional: true,
  },
  established: {
    in: ["body"],
    isNumeric: true,
    notEmpty: true,
  },
  verified: {
    in: ["body"],
    isNumeric: true,
    notEmpty: true,
  },
  taxId: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  files: {
    custom: {
      options: (_, { req }) => {
        if (!req.files || req.files.length === 0) {
          throw new Error("images not uploaded!");
        }
        return true;
      },
    },
  },
};
