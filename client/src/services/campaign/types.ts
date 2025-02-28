import { Campaign, CampaignStatus } from "@/types";

export type GetAllCampaignsResponseType = {
  items: Campaign[];
  message: string;
  total: number;
  take: number;
  skip: number;
};
export type GetByIdCampaignResponseType = {
  item: Campaign;
  message: string;
};
export type GetByUserIdCampaignResponseType = {
  item: Campaign[];
  message: string;
};
export type CampaignRequestPayload = {
  title: string;
  description: string;
  goalAmount: number;
  categoryId: string;
  locationId: string;
  currency: string;
  images?: File[];
};
export type ChangeStatusRequestPayload = {
  id: string;
  status: CampaignStatus.Approved | CampaignStatus.Rejected;
};
