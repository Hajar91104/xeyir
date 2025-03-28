import { Donation } from "@/types";

export type GetAllDonationsResponseType = {
  items: Donation[];
  message: string;
};
export type GetByIdDonationResponseType = {
  item: Donation;
  message: string;
};
export type GetByUserIdDonationResponseType = {
  item: Donation[];
  message: string;
};
export type DonationRequestPayload = {
  campaign: string;
  // user: string;
  amount: number;
  tip: number;
  isAnonymous: boolean;
};

export type CreateDonationResponseType = {
  item?: Donation;
  message: string;
};
// export type ChangeStatusRequestPayload = {
//   id: string;
//   status: CampaignStatus.Approved | CampaignStatus.Rejected;
// };
