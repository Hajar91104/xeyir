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
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <span className="text-sm">
        {row.original.amount.toLocaleString()} {row.original.currency}
      </span>
    ),
  },
  {
    accessorKey: "tip",
    header: () => <span className="hidden sm:inline">Tip</span>,
    cell: ({ row }) => (
      <span className="text-sm hidden sm:inline">
        {row.original.tip.toLocaleString()} {row.original.currency}
      </span>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link to={`/detail/${row.original.id}`} className="hover:underline">
        {row.original.title}
      </Link>
    ),
  },
];
