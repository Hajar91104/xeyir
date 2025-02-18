import { Request, Response } from "express";
import Donation from "../mongoose/schemas/donation";
import Campaign from "../mongoose/schemas/campaign";
// import { calculateDateDifference } from "../utils/date";
import { Campaign as TCampaign } from "../types/schema";

const getAll = async (req: Request, res: Response) => {
  try {
    const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
    const user = req.user;
    const filter: Record<string, string> = {};
    if (user?.role !== "admin") {
      filter.user = user?._id.toString() ?? "";
    }
    const donations = await Donation.find(filter).populate(
      "campaign",
      "images goalAmount currency title description"
    );
    // .populate("dropOffLocations")
    // .populate("pickUpLocation");

    donations.forEach((donation) => {
      (donation.campaign as TCampaign).images = (
        donation.campaign as TCampaign
      ).images.map((image) => {
        const validImage = image ?? "";
        return validImage.startsWith(BASE_URL)
          ? validImage
          : `${BASE_URL}/public/rent/${validImage}`;
      });
    });

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
const create = async (req: Request, res: Response) => {
  try {
    const {
      campaignId,
      amount,
      tip,
      billingAddress,
      billingName,
      billingPhoneNumber,
      billingTownCity,
    } = req.matchedData;
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      res.status(404).json({ message: "Campaign not found" });
      return;
    }

    // const dateCount = calculateDateDifference(startDate, endDate);
    const total = amount + tip;
    const donation = new Donation({
      campaign: campaignId,
      user: req.user?._id,
      amount,
      tip,
      billing: {
        name: billingName,
        address: billingAddress,
        phoneNumber: billingPhoneNumber,
        townCity: billingTownCity,
      },
      total,
    });
    await donation.save();
    res.json({
      message: "Donation created successfully",
      item: donation,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export default {
  getAll,
  create,
};
