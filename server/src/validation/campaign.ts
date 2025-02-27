import { Schema } from "express-validator";
import mongoose from "mongoose";

export const getAllCampaignsSchema: Schema = {
  type: {
    in: ["query"],
    matches: {
      options: [/^(recommended|popular)$/],
      errorMessage: "Type must be either 'recommended' or 'popular'",
    },
    optional: true,
  },
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
  category: {
    in: ["query"],
    optional: true,
  },

  close_to_goal: {
    in: ["query"],
    isBoolean: true,
    optional: true,
  },

  location: {
    in: ["query"],
    isString: true,
    optional: true,
  },
  time_period: {
    in: ["query"],
    isString: true,
    optional: true,
  },
};

export const createCampaignSchema: Schema = {
  title: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  description: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  // author: {
  //   in: ["body"],
  //   isString: true,
  //   notEmpty: true,
  // },
  goalAmount: {
    in: ["body"],
    isNumeric: true,
    optional: true,
  },
  categoryId: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  //   showInRecommendation: {
  //     in: ["body"],
  //     isBoolean: true,
  //     optional: true,
  //   },
  locationId: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  currency: {
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
export const editCampaignSchema: Schema = {
  title: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  description: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  // updates: {
  //   in: ["body"],
  //   isString: true,
  //   optional: true,
  // },
  goalAmount: {
    in: ["body"],
    isNumeric: true,
    optional: true,
  },

  categoryId: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },
  locationId: {
    in: ["body"],
    isString: true,
    notEmpty: true,
  },

  currency: {
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
