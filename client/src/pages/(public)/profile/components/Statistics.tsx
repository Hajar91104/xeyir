import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Pie, PieChart } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import donationService from "@/services/donation";
import { useAppSelector } from "@/hooks/redux";
import { selectUserData } from "@/store/features/userSlice";
import { Spinner } from "@/components/shared/Spinner";

function transformBarData(donations: any[]) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const dayMap: Record<string, number> = {};

  donations.forEach((donation) => {
    const date = new Date(donation.createdAt);

    if (
      date.getMonth() === currentMonth &&
      date.getFullYear() === currentYear
    ) {
      const dayLabel = date.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
      });
      dayMap[dayLabel] = (dayMap[dayLabel] || 0) + donation.amount;
    }
  });

  return Object.entries(dayMap).map(([day, total]) => ({
    day,
    total,
  }));
}

function transformPieData(donations: any[]) {
  const amountsByCategory: Record<string, number> = {};
  let totalAmount = 0;

  donations.forEach((donation) => {
    const categoryName = donation.campaign?.category?.name || "Uncategorized";

    // Sum amounts
    amountsByCategory[categoryName] =
      (amountsByCategory[categoryName] || 0) + donation.amount;
    totalAmount += donation.amount;
  });

  return Object.entries(amountsByCategory).map(([category, amt]) => ({
    category,

    value: Math.round((amt / totalAmount) * 100),
  }));
}

const barChartConfig = {
  total: {
    label: "Daily Donations",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const pieChartConfig = {
  value: {
    label: "Category Percentage",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const StatisticsSection = () => {
  const { user } = useAppSelector(selectUserData);

  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.PROFILE_DONATIONS],
    queryFn: () => donationService.getByUserId({ userId: user!._id }),
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

  const donations = data?.data?.item || [];

  const barData = transformBarData(donations);
  const pieData = transformPieData(donations);

  return (
    <div className="flex sm:flex-row flex-col sm:items-end justify-center gap-6 sm:gap-12">
      <Card>
        <CardHeader>
          <CardTitle>Donations This Month</CardTitle>
          <CardDescription>Daily Totals</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={barChartConfig}>
            <BarChart data={barData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="total" fill="var(--color-total)" radius={8} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="leading-none text-muted-foreground">
            Showing daily donation amounts for the current month
          </div>
        </CardFooter>
      </Card>

      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Donations by Category</CardTitle>
          <CardDescription>Current Totals</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={pieChartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="category"
                innerRadius={60}
                outerRadius={80}
                fill="var(--color-value)"
                paddingAngle={2}
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="leading-none text-muted-foreground">
            Percentage breakdown by campaign category
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StatisticsSection;
