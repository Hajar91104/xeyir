// import { Request, Response } from "express";
// import Update from "../mongoose/schemas/update";
// import Campaign from "../mongoose/schemas/campaign";

// const getAll = async (req: Request, res: Response) => {
//   try {
//     const updates = await Update.find().populate("author").populate("campaign");
//     res.status(200).json({
//       message: "Updates fetched successfully",
//       items: updates,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
// const getByRentId = async (req: Request, res: Response) => {
//   try {
//     const { campaignId } = req.params;

//     const updates = await Update.find({
//       campaign: campaignId,
//     }).populate("author");
//     res.status(200).json({
//       message: "Updates fetched successfully!",
//       items: updates,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
// const create = async (req: Request, res: Response) => {
//   try {
//     const user = req.user;
//     const { campaignId, content } = req.matchedData;

//     const campaign = await Campaign.findById(campaignId);

//     if (!campaign) {
//       res.status(404).json({ message: "Campaign not found" });
//       return;
//     }

//     const update = await Update.create({
//       author: user!._id,
//       campaign: campaignId,
//       content,
//     });

//     campaign.updates.push(update._id);
//     await campaign.save();

//     res.status(201).json({
//       message: "Review created successfully",
//       update,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// export default {
//   getAll,
//   getByRentId,
//   create,
// };
