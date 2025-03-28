import { DataTable } from "@/components/shared/DataTable";
import { dashboardReviewsColumns } from "./components/DashboardReviewColumns";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import commentService from "@/services/comment";
import { Spinner } from "@/components/shared/Spinner";

const ReviewsDashboardPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.DASHBOARD_COMMENTS],
    queryFn: () => commentService.getAll(),
  });
  console.log(data);

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return <div>Something went wrong...</div>;
  }

  const items = data?.data?.items || [];
  return (
    <div>
      <DataTable columns={dashboardReviewsColumns} data={items} />
    </div>
  );
};

export default ReviewsDashboardPage;
