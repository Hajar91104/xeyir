import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import donationService from "@/services/donation";
import { Spinner } from "@/components/shared/Spinner";

export function StatisticsComponent() {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.DASHBOARD_DONATIONS],
    queryFn: () => donationService.getAll(),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-6">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">Something went wrong...</div>
    );
  }

  const donations = data?.data?.items || [];

  const chartData = donations.map((donation) => ({
    date: new Date(donation.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    amount: donation.amount,
    tip: donation.tip || 0,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Donation Statistics</CardTitle>
        <CardDescription>Amount donated per day.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="date" tick={{ fill: "#6b7280" }} />
            <YAxis tick={{ fill: "#6b7280" }} />
            <Tooltip cursor={{ fill: "rgba(0, 0, 0, 0.1)" }} />
            <Bar dataKey="amount" fill="var(--primary)" radius={[5, 5, 0, 0]} />
            <Bar dataKey="tip" fill="var(--secondary)" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
