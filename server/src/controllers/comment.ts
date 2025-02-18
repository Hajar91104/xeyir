import { Request, Response } from "express";
import Comment from "../mongoose/schemas/comment";
import Donation from "../mongoose/schemas/donation";
import Campaign from "../mongoose/schemas/campaign";

const getAll = async (req: Request, res: Response) => {
  try {
    const comments = await Comment.find()
      .populate("author")
      .populate("campaign");
    res.status(200).json({
      message: "Comments fetched successfully",
      items: comments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getByRentId = async (req: Request, res: Response) => {
  try {
    const { campaignId } = req.params;

    const comments = await Comment.find({
      campaign: campaignId,
      status: "approved",
    }).populate("author");
    res.status(200).json({
      message: "Comments fetched successfully!",
      items: comments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const create = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const { donationId, campaignId, content } = req.matchedData;
    const donation = await Donation.findById(donationId);

    if (!donation) {
      res.status(404).json({ message: "Donation not found" });
      return;
    }

    if (donation.hasComment) {
      res.status(400).json({ message: "Donation already has a comment" });
      return;
    }
    const campaign = await Campaign.findById(campaignId);

    if (!campaign) {
      res.status(404).json({ message: "Campaign not found" });
      return;
    }

    const comment = await Comment.create({
      author: user!._id,
      campaign: campaignId,
      content,
    });

    donation.hasComment = true;
    await donation.save();

    campaign.comments.push(comment._id);
    await campaign.save();

    res.status(201).json({
      message: "Review created successfully",
      comment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const changeStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.matchedData;

    const comment = await Comment.findById(id);

    if (!comment) {
      res.status(404).json({ message: "Comment not found" });
      return;
    }

    comment.status = status;
    await comment.save();

    res.status(201).json({
      message: "Comment status updated successfully",
      comment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default {
  getAll,
  getByRentId,
  create,
  changeStatus,
};
