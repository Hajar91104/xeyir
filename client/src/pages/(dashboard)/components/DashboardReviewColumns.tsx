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

export type Review = {
  id: string;
  campaign: string;
  author: string;
  content: string;
  date: number;
  status: "pending" | "approved" | "rejected";
};

export const dashboardReviewsColumns: ColumnDef<Review>[] = [
  {
    accessorKey: "campaign",
    header: "Campaign",
    cell: ({ row }) => {
      return (
        <Link
          to={`/detail/${row.original.id}`}
          className="hover:underline font-medium"
        >
          {row.original.campaign}
        </Link>
      );
    },
  },
  {
    accessorKey: "author",
    header: "Author",
  },
  {
    accessorKey: "content",
    header: "Content",
  },
  {
    accessorKey: "date",
    header: () => <span className="hidden sm:block">Date</span>,
    cell: ({ row }) => {
      return (
        <span className="text-nowrap hidden sm:block">
          {format(row.original.date, "dd.MM.yyyy")}
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
      // const queryClient = useQueryClient();
      // const { mutate } = useMutation({
      //   mutationFn: reservationService.changeStatus,
      //   onSuccess: () => {
      //     toast.success("Status updated successfully");
      //     queryClient.invalidateQueries({
      //       queryKey: [QUERY_KEYS.ADMIN_RESERVATIONS],
      //     });
      //   },
      // });
      const status = data.row.original.status;
      // if (
      //   status !== ReservationStatus.Pending &&
      //   status !== ReservationStatus.Approved
      // ) {
      //   return null;
      // }
      // function handleStatusChange(
      //   status: ReservationStatus.Approved | ReservationStatus.Rejected
      // ) {
      //   mutate({
      //     id: data.row.original._id,
      //     status,
      //   });
      // }
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
                  // onClick={() => handleStatusChange(ReservationStatus.Approved)}
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
                  // onClick={() => handleStatusChange(ReservationStatus.Rejected)}
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
