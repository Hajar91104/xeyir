import mongoose, { Types } from "mongoose";
const { Schema } = mongoose;

const commentSchema = new Schema({
  author: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  campaign: {
    type: Types.ObjectId,
    ref: "Campaign",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  content: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "canceled"],
    default: "pending",
  },
});

commentSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.__v;
  },
});

export default mongoose.model("Comment", commentSchema);
