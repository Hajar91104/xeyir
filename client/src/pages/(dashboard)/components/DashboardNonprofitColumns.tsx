import { ColumnDef } from "@tanstack/react-table";
import { CheckCircle2Icon, Edit2Icon } from "lucide-react";
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
import { Nonprofit, NonprofitStatus } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/constants/query-keys";
import nonprofitService from "@/services/nonprofit";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const dashboardNonprofitColumns: ColumnDef<Nonprofit>[] = [
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
    accessorKey: "taxId",
    header: () => <span className="hidden sm:block">Tax Id</span>,
    cell: ({ row }) => {
      return (
        <span className="text-nowrap hidden sm:block">
          {row.original.taxId}
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
          to={`/fundraiser/${row.original._id}`}
          className="hover:underline font-medium"
        >
          {row.original.title}
        </Link>
      );
    },
  },
  {
    accessorKey: "established",
    header: () => <span className="hidden sm:block">Established</span>,

    cell: ({ row }) => {
      return (
        <span className="hidden sm:block text-nowrap">
          {row.original.established}
        </span>
      );
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status ?? "unverified";
      return <span className="hidden sm:block text-nowrap">{status}</span>;
    },
  },

  {
    accessorKey: "",
    header: "Actions",
    cell: (data) => {
      const queryClient = useQueryClient();
      const { mutate } = useMutation({
        mutationFn: nonprofitService.changeStatus,
        onSuccess: () => {
          toast.success("Status updated successfully");
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.DASHBOARD_NONPROFITS],
          });
        },
      });
      const { mutate: RemoveMutate } = useMutation({
        mutationFn: nonprofitService.remove,
        onSuccess: () => {
          toast.success("Removed successfully");
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.DASHBOARD_NONPROFITS],
          });
        },
      });
      const status = data.row.original.status;
      // if (status !== NonprofitStatus.Unverified) {
      //   return null;
      // }
      function handleStatusChange(
        status: NonprofitStatus.Verified | NonprofitStatus.Unverified
      ) {
        mutate({
          id: data.row.original._id,
          status,
        });
      }
      function handleRemove() {
        RemoveMutate({
          id: data.row.original._id,
        });
      }
      return (
        <div className="flex items-center gap-3">
          {status === NonprofitStatus.Unverified && (
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <Edit2Icon size={18} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => handleStatusChange(NonprofitStatus.Verified)}
                  className="cursor-pointer"
                >
                  <CheckCircle2Icon className="text-green-600" />
                  <p className="text-green-600">Verify</p>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="cursor-pointer">
                <RiDeleteBin6Line size={18} />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  nonprofit from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleRemove}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
