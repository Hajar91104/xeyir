import { DataTable } from "@/components/shared/DataTable";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import nonprofitService from "@/services/nonprofit";
import { dashboardNonprofitColumns } from "./components/DashboardNonprofitColumns";
import { Button } from "@/components/ui/button";
import { paths } from "@/constants/paths";

const NonprofitDashboardPage = () => {
  const navigate = useNavigate();

  const { data, isError } = useQuery({
    queryKey: [QUERY_KEYS.DASHBOARD_NONPROFITS],
    queryFn: () => nonprofitService.getAll(),
  });
  console.log(data);

  if (isError) {
    return <div>Something went wrong...</div>;
  }

  const items = data?.data?.items || [];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-lg sm:text-2xl py-6">Nonprofits</h1>
        <Button onClick={() => navigate(paths.DASHBOARD.NONPROFIT.CREATE)}>
          Create +
        </Button>
      </div>
      <DataTable columns={dashboardNonprofitColumns} data={items} />
    </div>
  );
};

export default NonprofitDashboardPage;
