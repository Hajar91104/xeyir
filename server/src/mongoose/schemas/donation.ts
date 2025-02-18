import mongoose, { Types } from "mongoose";
const { Schema } = mongoose;

const donationSchema = new Schema({
  campaign: {
    type: Types.ObjectId,
    ref: "Campaign",
    required: true,
  },
  user: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },
  tip: {
    type: Number,
    optional: true,
  },

  billing: {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    townCity: {
      type: String,
      required: true,
    },
  },
  hasComment: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // updatedAt: {
  //   type: Date,
  //   default: Date.now,
  // },
});

donationSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.__v;
  },
});

export default mongoose.model("Donation", donationSchema);
