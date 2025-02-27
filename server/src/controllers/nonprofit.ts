import { Request, Response } from "express";
import Location from "../mongoose/schemas/location";
import Nonprofit from "../mongoose/schemas/nonprofit";
import Category from "../mongoose/schemas/category";
import Comment from "../mongoose/schemas/comment";
// import Update from "../mongoose/schemas/update";

const getAll = async (req: Request, res: Response) => {
  try {
    const { take = 10, skip = 0, search } = req.matchedData;

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

    const items = await Nonprofit.find(filter).skip(+skip).limit(+take);

    const total = await Nonprofit.countDocuments(filter);
    items.forEach((item) => {
      item.images = item.images.map(
        (image) => `${process.env.BASE_URL}/public/nonprofit/${image}`
      );
    });
    res.status(201).json({
      message: "success",
      items,
      total,
      take: +take,
      skip: +skip,
    });
  } catch (error) {
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
      address,
      causes,
      established,
      verified,
      taxId,
    } = req.matchedData;

    const images = (req.files as any)?.map((file: any) => file.filename) || [];

    const nonprofit = new Nonprofit({
      title,
      description,
      address,
      causes,
      established,
      verified,
      taxId,
      images,
    });

    await nonprofit.save();

    res.status(201).json({
      message: "success",
      item: nonprofit,
    });
  } catch (error) {
    console.error("Error creating nonprofit:", error);

    res.json({
      message: error,
    });
  }
};

const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const nonprofit = await Nonprofit.findById(id);

    if (!nonprofit) {
      res.status(404).json({
        message: "Not found",
      });
      return;
    }

    nonprofit.images = nonprofit.images.map(
      (image) => `${process.env.BASE_URL}/public/nonprofit/${image}`
    );

    res.json({
      message: "success",
      item: { ...nonprofit.toObject() },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const nonprofit = await Nonprofit.findByIdAndDelete(id);

    if (!nonprofit) {
      res.status(404).json({
        message: "Not found",
      });
      return;
    }

    res.json({
      message: "success",
      item: nonprofit,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export default {
  getAll,
  getById,
  create,
  remove,
};
