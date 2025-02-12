import { paths } from "@/constants/paths";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

export type Campaign = {
  id: string;
  image: string;
  title: string;
  description: string;
  goalAmount: number;
  currency: string;
  date: number;
};

export const campaignColumns: ColumnDef<Campaign>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      return (
        <img
          src={row.original.image}
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
          to={`/fundraiser/${row.original.id}`}
          className="hover:underline font-medium"
        >
          {row.original.title}
        </Link>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.original.description;
      const truncated =
        description.length > 100
          ? description.slice(0, 100) + "..."
          : description;

      return <p className="text-gray-600">{truncated}</p>;
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      return (
        <span className="text-nowrap">
          {format(row.original.date, "MMM d, yyyy")}
        </span>
      );
    },
  },
  {
    accessorKey: "goalAmount",
    header: "Goal",
    cell: ({ row }) => {
      return (
        <span className="font-medium text-nowrap">
          {row.original.currency} {row.original.goalAmount.toLocaleString()}
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
          <Link to={paths.PROFILE.GOFUNDME.EDIT(data.row.original.id)}>
            <Edit2Icon className="w-4 h-4" />
          </Link>
        </div>
      );
    },
  },
];
