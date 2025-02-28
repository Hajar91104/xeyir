import mongoose, { Types } from "mongoose";
const { Schema } = mongoose;

const nonprofitsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
    optional: true,
  },
  address: {
    type: String,
    required: true,
  },
  causes: {
    type: String,
    required: true,
  },
  established: {
    type: String,
    required: true,
  },
  verified: {
    type: String,
    optional: true,
  },
  taxId: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["verified", "unverified"],
    default: "unverified",
  },
});

nonprofitsSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.__v;
  },
});

export default mongoose.model("Nonprofit", nonprofitsSchema);
