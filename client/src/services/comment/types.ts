import { Comment, CommentStatus } from "@/types";

export type GetAllCommentsResponseType = {
  items: Comment[];
  message: string;
};
export type GetByIdCommentResponseType = {
  item: Comment;
  message: string;
};
export type GetByIdsCommentResponseType = {
  items: Comment[];
  message: string;
};
export type CommentRequestPayload = {
  campaign: string;
  // user: string;
  donation: string;
  content: string;
};

export type CreateCommentResponseType = {
  item?: Comment;
  message: string;
};
export type ChangeStatusRequestPayload = {
  id: string;
  status: CommentStatus.Approved | CommentStatus.Rejected;
};
