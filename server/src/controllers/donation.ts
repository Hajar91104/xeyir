import { Request, Response } from "express";
import Donation from "../mongoose/schemas/donation";
import Campaign from "../mongoose/schemas/campaign";

const getAll = async (req: Request, res: Response) => {
  try {
    // const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
    const user = req.user;
    const filter: Record<string, string> = {};
    if (user?.role !== "admin") {
      filter.user = user?._id.toString() ?? "";
    }
    const donations = await Donation.find(filter).populate([
      "campaign",
      "user",
    ]);

    res.json({
      message: "Donations fetched successfully!",
      items: donations,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};
const getByUserId = async (req: Request, res: Response) => {
  try {
    let { userId } = req.params;

    if (req.isAuthenticated()) {
      userId = req.user._id.toString();
    }

    const donations = await Donation.find({
      user: userId,
    })
      .populate("user")
      .populate({
        path: "campaign",
        select: "donations images author category goalAmount title",
        populate: [
          {
            path: "donations",
            select: "amount tip",
          },
          {
            path: "author",
            select: "name surname",
          },
          {
            path: "category",
            select: "name",
          },
        ],
      });

    if (!donations || donations.length === 0) {
      res.status(404).json({
        message: "Donations not foud",
      });
      return;
    }

    res.status(200).json({
      message: "Donations fetched successfully!",
      item: donations,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error!");
  }
};
const create = async (req: Request, res: Response) => {
  try {
    const { campaign, amount, tip, isAnonymous } = req.body;

    const campaignn = await Campaign.findById(campaign);
    if (!campaignn) {
      res.status(404).json({ message: "Campaign not found" });
      return;
    }

    const total = amount + (tip || 0);

    const donation = new Donation({
      campaign: campaignn._id,
      user: req.user?._id,
      amount,
      tip: tip || 0,
      isAnonymous,
      total,
    });

    await donation.save();

    campaignn.donations.push(donation._id);
    await campaignn.save();

    res.json({
      message: "Donation created successfully",
      item: donation,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default {
  getAll,
  create,
  getByUserId,
};
