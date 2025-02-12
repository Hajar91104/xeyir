import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";

export type Contribution = {
  date: string;
  currency: string;
  amount: number;
  tip: number;
  title: string;
  id: string;
};

export const contributionColumns: ColumnDef<Contribution>[] = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "currency",
    header: "Currency",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "tip",
    header: "Tip",
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return (
        <Link to={`/detail/${row.original.id}`} className=" hover:underline">
          {row.original.title}
        </Link>
      );
    },
  },
];
