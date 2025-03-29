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
import { Campaign, CampaignStatus } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import campaignService from "@/services/campaign";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/constants/query-keys";

export const dashboardCampaignColumns: ColumnDef<Campaign>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      return (
        <img
          src={row.original.images[0]}
          alt={row.original.title}
          className=" h-[60px] object-cover rounded-lg"
        />
      );
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
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return (
        <Link
          to={`/detail/${row.original._id}`}
          className="hover:underline font-medium"
        >
          {row.original.title}
        </Link>
      );
    },
  },
  {
    accessorKey: "goalAmount",
    header: () => <span className="hidden sm:block">Goal</span>,

    cell: ({ row }) => {
      return (
        <span className="hidden sm:block text-nowrap">
          {row.original.goalAmount.toLocaleString()} {row.original.currency}
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
        mutationFn: campaignService.changeStatus,
        onSuccess: () => {
          toast.success("Status updated successfully");
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.DASHBOARD_CAMPAIGNS],
          });
        },
      });
      const status = data.row.original.status;
      if (status !== CampaignStatus.Pending) {
        return null;
      }
      function handleStatusChange(
        status: CampaignStatus.Approved | CampaignStatus.Rejected
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
                  onClick={() => handleStatusChange(CampaignStatus.Approved)}
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
                  onClick={() => handleStatusChange(CampaignStatus.Rejected)}
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
