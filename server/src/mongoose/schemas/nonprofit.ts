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
    type: Number,
    required: true,
  },
  verififed: {
    type: Number,
    required: true,
  },
  taxId: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
});

nonprofitsSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.__v;
  },
});

export default mongoose.model("Nonprofit", nonprofitsSchema);
