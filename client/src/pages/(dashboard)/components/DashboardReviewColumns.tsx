import { ColumnDef } from "@tanstack/react-table";
import { CheckCircle2Icon, Edit2Icon, XCircleIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RenderIf } from "@/components/shared/RenderIf";
import { Comment, CommentStatus } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import commentService from "@/services/comment";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/constants/query-keys";

export const dashboardReviewsColumns: ColumnDef<Comment>[] = [
  {
    accessorKey: "campaign",
    header: "Campaign",
    cell: ({ row }) => {
      return (
        <Link
          to={`/detail/${row.original.campaign._id}`}
          className="hover:underline font-medium"
        >
          {row.original.campaign.title}
        </Link>
      );
    },
  },
  {
    accessorKey: "author",
    header: "Author",
    cell: ({ row }) => {
      return (
        <span>
          {row.original.author.name} {row.original.author.surname}
        </span>
      );
    },
  },
  {
    accessorKey: "content",
    header: "Content",
    cell: ({ row }) => {
      return <span>{row.original.content}</span>;
    },
  },
  {
    accessorKey: "date",
    header: () => <span className="hidden sm:block">Date</span>,
    cell: ({ row }) => {
      return (
        <span className="text-nowrap hidden sm:block">
          {format(row.original.createdAt, "dd.MM.yyyy")}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status ?? "pending";
      return <span className="hidden sm:block text-nowrap">{status}</span>;
    },
  },

  {
    accessorKey: "",
    header: "Actions",
    cell: (data) => {
      const queryClient = useQueryClient();
      const { mutate } = useMutation({
        mutationFn: commentService.changeStatus,
        onSuccess: () => {
          toast.success("Status updated successfully");
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.DASHBOARD_COMMENTS],
          });
        },
      });
      const status = data.row.original.status;
      if (status !== CommentStatus.Pending) {
        return null;
      }
      function handleStatusChange(
        status: CommentStatus.Approved | CommentStatus.Rejected
      ) {
        mutate({
          id: data.row.original._id,
          status,
        });
      }
      return (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <Edit2Icon size={18} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Update Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <RenderIf condition={status === "pending"}>
                <DropdownMenuItem
                  onClick={() => handleStatusChange(CommentStatus.Approved)}
                  className="cursor-pointer "
                >
                  <CheckCircle2Icon className="text-green-600" />
                  <p className="text-green-600">Approve</p>
                </DropdownMenuItem>
              </RenderIf>
              <RenderIf
                condition={status === "pending" || status === "approved"}
              >
                <DropdownMenuItem
                  onClick={() => handleStatusChange(CommentStatus.Rejected)}
                  className="cursor-pointer "
                >
                  <XCircleIcon className="text-red-600" />
                  <p className="text-red-600">Reject</p>
                </DropdownMenuItem>
              </RenderIf>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
