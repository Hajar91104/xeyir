import axiosInstance from "../axiosInstance";
import {
  NonprofitRequestPayload,
  ChangeStatusRequestPayload,
  GetAllNonprofitsResponseType,
  GetByIdNonprofitResponseType,
  GetByUserIdNonprofitResponseType,
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

  return await axiosInstance.get<GetAllNonprofitsResponseType>(
    `/nonprofit?${searchParams.toString()}`
  );
};
const getById = async (id: string) => {
  return await axiosInstance.get<GetByIdNonprofitResponseType>(
    `/nonprofit/${id}`
  );
};
const getByUserId = async ({ userId }: { userId: string }) => {
  return await axiosInstance.get<GetByUserIdNonprofitResponseType>(
    `/nonprofit/user/${userId}`
  );
};

const create = async (data: NonprofitRequestPayload) => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("address", data.address);
  formData.append("causes", data.causes);
  formData.append("established", data.established);
  formData.append("verified", data.verified);
  formData.append("taxId", data.taxId);

  data.images?.forEach((image) => {
    formData.append("images", image);
  });

  return await axiosInstance.post("/nonprofit", formData);
};
const edit = async (data: NonprofitRequestPayload & { id?: string }) => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("address", data.address);
  formData.append("causes", data.causes);
  formData.append("established", data.established);
  formData.append("verified", data.verified);
  formData.append("taxId", data.taxId);
  if (data.images)
    Array.from(data.images).forEach((image) => {
      formData.append(`images`, image);
    });

  return await axiosInstance.put(`/nonprofit/${data.id}`, formData);
};
const remove = async ({ id }: { id: string }) => {
  return await axiosInstance.delete(`/nonprofit/${id}`);
};

const changeStatus = async (data: ChangeStatusRequestPayload) => {
  return await axiosInstance.patch(`/nonprofit/${data.id}/change-status`, {
    status: data.status,
  });
};

const nonprofitService = {
  getAll,
  create,
  getById,
  getByUserId,
  edit,
  changeStatus,
  remove,
};

export default nonprofitService;
