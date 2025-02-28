import { Request, Response } from "express";
import Location from "../mongoose/schemas/location";
import Campaign from "../mongoose/schemas/campaign";
import Category from "../mongoose/schemas/category";
import Comment from "../mongoose/schemas/comment";
// import Update from "../mongoose/schemas/update";

const getAll = async (req: Request, res: Response) => {
  try {
    const {
      type,
      take = 10,
      skip = 0,
      search,
      category,
      close_to_goal,
      location,
      time_period,
    } = req.matchedData;

    const filter: Record<string, any> = {
      $and: [],
      $or: [],
    };

    if (search) {
      filter.$or.push(
        { name: { $regex: new RegExp(search, "i") } },
        { description: { $regex: new RegExp(search, "i") } }
      );
    }

    if (location) {
      const locationList = Array.isArray(location) ? location : [location];
      filter.location = { $in: locationList };
    }

    if (category) {
      const categoryList = Array.isArray(category) ? category : [category];
      filter.category = { $in: categoryList };
    }

    if (time_period && time_period !== "all") {
      const now = new Date();
      let startDate;

      switch (time_period) {
        case "24h":
          startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
          break;
        case "7d":
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case "30d":
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        case "12m":
          startDate = new Date(now.getTime() - 12 * 30 * 24 * 60 * 60 * 1000);
          break;
      }

      if (startDate) {
        filter.$and.push({ createdAt: { $gte: startDate } });
      }
    }

    if (close_to_goal) {
      filter.$and.push({
        $expr: {
          $lte: [
            { $subtract: ["$goalAmount", { $sum: "$donations.amount" }] },
            50,
          ],
        },
      });
    }

    if (filter.$and.length === 0) delete filter.$and;
    if (filter.$or.length === 0) delete filter.$or;

    const items = await Campaign.find(filter)
      .skip(+skip)
      .limit(+take)
      .populate(["category", "location", "goalAmount", "donations", "author"]);

    const total = await Campaign.countDocuments(filter);

    items.forEach((item) => {
      item.images = item.images.map(
        (image) => `${process.env.BASE_URL}/public/campaign/${image}`
      );
    });

    res.status(200).json({
      message: "success",
      items,
      total,
      take: +take,
      skip: +skip,
    });
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      locationId,
      categoryId,
      goalAmount,
      currency,
      status,
      // showInRecommendation,
    } = req.matchedData;

    const category = await Category.findById(categoryId);

    if (!category) {
      res.status(404).json({
        message: "Category not found!",
      });
      return;
    }
    const location = await Location.findById(locationId);

    if (!location) {
      res.status(404).json({
        message: "Location not found!",
      });
      return;
    }

    // const images =
    //   (req.files as any)?.map((file: any) => {
    //     file.filename;
    //   }) || [];
    const images = (req.files as any)?.map((file: any) => file.filename) || [];

    const campaign = new Campaign({
      title,
      description,
      author: req.user?._id,
      location,
      category,
      goalAmount,
      currency,
      images,
      status,
      // showInRecommendation,
    });

    await campaign.save();

    category.campaigns.push(campaign._id);
    await category.save();
    res.status(201).json({
      message: "success",
      item: campaign,
    });
  } catch (error) {
    console.error("Error creating campaign:", error);

    res.json({
      message: error,
    });
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const campaign = await Campaign.findById(id).populate([
      "category",
      "location",
      "author",
      // "update",
    ]);

    if (!campaign) {
      res.status(404).json({
        message: "Not found",
      });
      return;
    }
    const comments = await Comment.find({
      campaign: id,
      status: "approved",
    }).populate("author", "name surname");

    // const updates = await Update.find({
    //   campaign: id,
    // }).populate("author", "createdAt");

    campaign.images = campaign.images.map(
      (image) => `${process.env.BASE_URL}/public/campaign/${image}`
    );

    res.json({
      message: "success",
      item: { ...campaign.toObject(), comments },
    });
  } catch (error) {
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

    const campaigns = await Campaign.find({
      author: userId,
    }).populate(["category", "location", "goalAmount", "donations", "author"]);

    if (!campaigns || campaigns.length === 0) {
      res.status(404).json({
        message: "Campaigns not foud",
      });
      return;
    }
    campaigns.forEach((item) => {
      item.images = item.images.map(
        (image) => `${process.env.BASE_URL}/public/campaign/${image}`
      );
    });

    res.status(200).json({
      message: "Campaign fetched successfully!",
      item: campaigns,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error!");
  }
};

const edit = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = {
      ...req.matchedData,
    };

    // data.dropOffLocations = JSON.parse(req.body.dropOffLocations || "[]");
    const { categoryId, locationId } = data;

    const category = await Category.findById(categoryId);
    const location = await Location.findById(locationId);

    if (!category) {
      res.status(404).json({
        message: "Category not found!",
      });
      return;
    }
    if (!location) {
      res.status(404).json({
        message: "Location not found!",
      });
      return;
    }

    if (req.files && (req.files as any).length > 0) {
      data.images = (req.files as any).map((file: any) => file.filename);
    }

    const campaign = await Campaign.findById(id);

    if (!campaign) {
      res.status(404).json({
        message: "Not found",
      });
      return;
    }

    const oldCategoryId = campaign.category;

    const oldCategory = await Category.findByIdAndUpdate(oldCategoryId, {
      $pull: {
        campaigns: id,
      },
    });
    category.campaigns.push(campaign._id);
    await category.save();

    const oldLocationId = campaign.location;

    const oldLocation = await Location.findByIdAndUpdate(oldLocationId, {
      $pull: {
        campaigns: id,
      },
    });
    location.campaigns.push(campaign._id);
    await location.save();

    campaign.title = data.title;
    campaign.description = data.description;
    campaign.category = data.categoryId;
    campaign.location = data.locationId;
    campaign.goalAmount = data.goalAmount;
    campaign.currency = data.currency;
    // campaign.updates = data.updates;
    // campaign.updates.push(String(data.updates));

    if (data.images) campaign.images = data.images;
    // if (data.showInRecommendation !== undefined)
    //   campaign.showInRecommendation = data.showInRecommendation;

    await campaign.save();

    res.json({
      message: "success",
      item: campaign,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // const data = {
    //   ...req.matchedData,
    // };
    // const { categoryId, locationId } = data;
    const campaign = await Campaign.findById(id);

    const category = await Category.findById(campaign?.category);
    const location = await Location.findById(campaign?.location);

    if (!category) {
      res.status(404).json({
        message: "Category not found!",
      });
      return;
    }
    if (!location) {
      res.status(404).json({
        message: "Location not found!",
      });
      return;
    }
    if (!campaign) {
      res.status(404).json({
        message: "Not found",
      });
      return;
    }

    const oldCategoryId = campaign.category;
    const oldCategory = await Category.findByIdAndUpdate(oldCategoryId, {
      $pull: {
        campaigns: id,
      },
    });
    await category.save();

    const oldLocationId = campaign.location;
    const oldLocation = await Location.findByIdAndUpdate(oldLocationId, {
      $pull: {
        campaigns: id,
      },
    });
    await location.save();

    await Campaign.findByIdAndDelete(id);
    res.json({
      message: "success",
      item: campaign,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
const changeStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.matchedData;

    const campaign = await Campaign.findById(id);

    if (!campaign) {
      res.status(404).json({ message: "Campaign not found" });
      return;
    }

    if (campaign.status === "rejected") {
      res.status(400).json({
        message: "Campaign is already rejected",
      });
      return;
    }

    campaign.status = status;
    await campaign.save();

    res.status(201).json({
      message: "Campaign status updated successfully",
      campaign,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export default {
  getAll,
  getById,
  getByUserId,
  create,
  edit,
  remove,
  changeStatus,
};
