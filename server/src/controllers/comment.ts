import { Request, Response } from "express";
import Comment from "../mongoose/schemas/comment";
import Donation from "../mongoose/schemas/donation";
import Campaign from "../mongoose/schemas/campaign";

const getAll = async (req: Request, res: Response) => {
  try {
    const comments = await Comment.find()
      .populate("author")
      .populate("campaign")
      .populate("donation");

    res.status(200).json({
      message: "Comments fetched successfully",
      items: comments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getByUserId = async (req: Request, res: Response) => {
  try {
    let { userId } = req.params;

    if (req.isAuthenticated()) {
      userId = req.user._id.toString();
    }

    const comments = await Comment.find({
      user: userId,
    }).populate(["campaign", "author", "donation"]);

    if (!comments || comments.length === 0) {
      res.status(404).json({
        message: "Comments not foud",
      });
      return;
    }

    res.status(200).json({
      message: "Comments fetched successfully!",
      item: comments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error!");
  }
};
const getByDonationId = async (req: Request, res: Response) => {
  try {
    const { donationId } = req.matchedData;

    const comments = await Comment.find({
      donation: donationId,
    }).populate(["campaign", "author", "donation"]);

    if (!comments || comments.length === 0) {
      res.status(404).json({
        message: "Donations not foud",
      });
      return;
    }

    res.status(200).json({
      message: "Comments fetched successfully!",
      item: comments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error!");
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const { campaign, donation, content } = req.matchedData;
    const donationn = await Donation.findById(donation);

    if (!donationn) {
      res.status(404).json({ message: "Donation not found" });
      return;
    }

    if (donationn.hasComment) {
      res.status(400).json({ message: "Donation already has a comment" });
      return;
    }
    const campaignn = await Campaign.findById(campaign);

    if (!campaignn) {
      res.status(404).json({ message: "Campaign not found" });
      return;
    }

    const comment = await Comment.create({
      author: user!._id,
      donation: donationn._id,
      campaign: campaignn._id,
      content,
    });

    donationn.hasComment = true;
    await donationn.save();

    campaignn.comments.push(comment._id);
    await campaignn.save();

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
  getByUserId,
  create,
  changeStatus,
  getByDonationId,
};
