import { paths } from "@/constants/paths";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Campaign } from "@/types";

export const campaignColumns: ColumnDef<Campaign>[] = [
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
    accessorKey: "description",
    header: () => <span className="hidden sm:block">Description</span>,
    cell: ({ row }) => {
      const description = row.original.description;
      const truncated =
        description.length > 100
          ? description.slice(0, 100) + "..."
          : description;

      return <p className="text-gray-600 hidden sm:block">{truncated}</p>;
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
    accessorKey: "",
    header: "Actions",
    cell: (data) => {
      return (
        <div>
          <Link to={paths.PROFILE.GOFUNDME.EDIT(data.row.original._id)}>
            <Edit2Icon className="w-4 h-4" />
          </Link>
        </div>
      );
    },
  },
];
