import axiosInstance from "../axiosInstance";
import {
  CampaignRequestPayload,
  GetAllCampaignsResponseType,
  GetByIdCampaignResponseType,
  GetByUserIdCampaignResponseType,
} from "./types";

const getAll = async (
  pageParams?: {
    take?: number;
    skip?: number;
    // type?: "recommended" | "popular";
  },
  searchParamsStr?: string
) => {
  const searchParams = new URLSearchParams(searchParamsStr);

  if (pageParams?.take) searchParams.append("take", pageParams.take.toString());
  if (pageParams?.skip) searchParams.append("skip", pageParams.skip.toString());
  // if (pageParams?.type) searchParams.append("type", pageParams.type);

  return await axiosInstance.get<GetAllCampaignsResponseType>(
    `/campaign?${searchParams.toString()}`
  );
};
const getById = async (id: string) => {
  return await axiosInstance.get<GetByIdCampaignResponseType>(
    `/campaign/${id}`
  );
};
const getByUserId = async ({ userId }: { userId: string }) => {
  return await axiosInstance.get<GetByUserIdCampaignResponseType>(
    `/campaign/user/${userId}`
  );
};

const create = async (data: CampaignRequestPayload) => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("goalAmount", data.goalAmount.toString());
  formData.append("categoryId", data.categoryId);
  formData.append("locationId", data.locationId);
  formData.append("currency", data.currency);

  data.images?.forEach((image) => {
    formData.append("images", image);
  });

  return await axiosInstance.post("/campaign", formData);
};
const edit = async (data: CampaignRequestPayload & { id?: string }) => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("goalAmount", data.goalAmount.toString());
  formData.append("categoryId", data.categoryId);
  formData.append("locationId", data.locationId);
  formData.append("currency", data.currency);
  if (data.images)
    Array.from(data.images).forEach((image) => {
      formData.append(`images`, image);
    });

  return await axiosInstance.put(`/campaign/${data.id}`, formData);
};

const campaignService = { getAll, create, getById, getByUserId, edit };

export default campaignService;
