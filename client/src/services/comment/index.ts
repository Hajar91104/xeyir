import axiosInstance from "../axiosInstance";
import {
  ChangeStatusRequestPayload,
  CommentRequestPayload,
  GetAllCommentsResponseType,
  GetByIdsCommentResponseType,
} from "./types";

const getAll = async () => {
  return await axiosInstance.get<GetAllCommentsResponseType>(`/comment`);
};
const create = async (data: CommentRequestPayload) => {
  return await axiosInstance.post("/comment", data);
};
const getByUserId = async ({ userId }: { userId: string }) => {
  return await axiosInstance.get<GetByIdsCommentResponseType>(
    `/comment/user/${userId}`
  );
};
const getByDonationId = async ({ donationId }: { donationId: string }) => {
  return await axiosInstance.get<GetByIdsCommentResponseType>(
    `/comment/donation/${donationId}`
  );
};
const changeStatus = async (data: ChangeStatusRequestPayload) => {
  return await axiosInstance.patch(`/comment/${data.id}/change-status`, {
    status: data.status,
  });
};

const commentService = {
  getAll,
  create,
  changeStatus,
  getByUserId,
  getByDonationId,
};

export default commentService;
