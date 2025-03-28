import { Donation } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { MdOutlineModeComment } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import commentService from "@/services/comment";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/constants/query-keys";

import { useState } from "react";

export const contributionColumns: ColumnDef<Donation>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <span className="text-sm">
        {format(row.original.createdAt, "dd.MM.yyyy")}
      </span>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <span className="text-sm">
        {row.original.amount.toLocaleString()} {row.original.campaign.currency}
      </span>
    ),
  },
  {
    accessorKey: "tip",
    header: () => <span className="hidden sm:inline">Tip</span>,
    cell: ({ row }) => (
      <span className="text-sm hidden sm:inline">
        {row.original.tip.toLocaleString()} {row.original.campaign.currency}
      </span>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link
        to={`/detail/${row.original.campaign._id}`}
        className="hover:underline"
      >
        {row.original.campaign.title}
      </Link>
    ),
  },
  {
    accessorKey: "",
    header: "Actions",
    cell: ({ row }) => {
      const queryClient = useQueryClient();
      const [comment, setComment] = useState("");

      const { mutate } = useMutation({
        mutationFn: commentService.create,
        onSuccess: () => {
          toast.success("Comment shared successfully!");
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.PROFILE_COMMENTS],
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.PROFILE_DONATIONS],
          });
        },
        onError: () => {
          toast.error("Failed to post comment.");
        },
      });

      const hasComment = row.original.hasComment;
      if (hasComment) {
        return null;
      }

      const handleSubmit = () => {
        mutate({
          campaign: row.original.campaign._id,
          donation: row.original._id,
          content: comment,
        });
      };

      return (
        <Dialog>
          <DialogTrigger asChild>
            <button>
              <MdOutlineModeComment size={18} />
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Post a Comment</DialogTitle>
              <DialogDescription>
                Share your words of support. Click submit when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="comment" className="text-right">
                  Comment
                </Label>
                <Input
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSubmit}>Submit</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
