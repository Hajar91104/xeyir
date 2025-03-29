import axiosInstance from "../axiosInstance";
import {
  GetByUserIdDonationResponseType,
  DonationRequestPayload,
  GetAllDonationsResponseType,
} from "./types";

const getAll = async () => {
  return await axiosInstance.get<GetAllDonationsResponseType>(`/donation`);
};

const getByUserId = async ({ userId }: { userId: string }) => {
  return await axiosInstance.get<GetByUserIdDonationResponseType>(
    `/donation/user/${userId}`
  );
};

const create = async (data: DonationRequestPayload) => {
  return await axiosInstance.post("/donation", data);
};

const donationService = {
  getAll,
  create,
  getByUserId,
};

export default donationService;
