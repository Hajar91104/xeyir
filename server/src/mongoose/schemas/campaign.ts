import mongoose, { Types } from "mongoose";
const { Schema } = mongoose;

const campaignSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  author: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  location: {
    type: Types.ObjectId,
    ref: "Location",
    required: true,
  },
  category: {
    type: Types.ObjectId,
    ref: "Category",
    required: true,
  },
  goalAmount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: "USD",
  },

  images: {
    type: [String],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  comments: {
    type: [Types.ObjectId],
    ref: "Comment",
    default: [],
  },
  updates: {
    type: [Types.ObjectId],
    ref: "Update",
    default: [],
  },
  donations: {
    type: [Types.ObjectId],
    ref: "Donation",
    default: [],
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  //   showInRecommendation: {
  //     type: Boolean,
  //     default: false,
  //   },
});

campaignSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.__v;
  },
});

export default mongoose.model("Campaign", campaignSchema);
