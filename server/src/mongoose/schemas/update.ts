// import mongoose, { Types } from "mongoose";
// const { Schema } = mongoose;

// const updateSchema = new Schema({
//   author: {
//     type: Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   campaign: {
//     type: Types.ObjectId,
//     ref: "Campaign",
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now(),
//   },
//   content: {
//     type: String,
//     required: true,
//   },
// });

// updateSchema.set("toJSON", {
//   virtuals: true,
//   transform: (doc, ret) => {
//     delete ret.__v;
//   },
// });

// export default mongoose.model("Update", updateSchema);
