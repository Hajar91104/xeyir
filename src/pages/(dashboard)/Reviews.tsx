import { DataTable } from "@/components/shared/DataTable";
import {
  dashboardReviewsColumns,
  Review,
} from "./components/DashboardReviewColumns";

const ReviewsDashboardPage = () => {
  const data: Review[] = [
    {
      id: "123",
      campaign: "Rebuilding a home - Maureen Folan (McDonagh)",
      author: "John Doe",
      content: "Allah komek olsun",
      date: Date.now(),
      status: "pending",
    },
  ];
  return (
    <div>
      <DataTable columns={dashboardReviewsColumns} data={data} />
    </div>
  );
};

export default ReviewsDashboardPage;
