import mongoose from "mongoose";
const { Schema } = mongoose;

const locationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  campaigns: [
    {
      type: Schema.Types.ObjectId,
      ref: "Campaign",
    },
  ],
});

export default mongoose.model("Location", locationSchema);
