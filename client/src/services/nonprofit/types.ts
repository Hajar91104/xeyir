import { Nonprofit, NonprofitStatus } from "@/types";

export type GetAllNonprofitsResponseType = {
  items: Nonprofit[];
  message: string;
  total: number;
  take: number;
  skip: number;
};
export type GetByIdNonprofitResponseType = {
  item: Nonprofit;
  message: string;
};
export type GetByUserIdNonprofitResponseType = {
  item: Nonprofit[];
  message: string;
};
export type NonprofitRequestPayload = {
  title: string;
  description: string;
  address: string;
  causes: string;
  established: string;
  verified?: string;
  taxId: string;
  images?: File[];
};
export type ChangeStatusRequestPayload = {
  id: string;
  status: NonprofitStatus.Verified | NonprofitStatus.Unverified;
};
