import { DataTable } from "@/components/shared/DataTable";
import { dashboardCampaignColumns } from "./components/DashboardCampaignColumns";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import campaignService from "@/services/campaign";
import { Spinner } from "@/components/shared/Spinner";

const CampaignDashboardPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.DASHBOARD_CAMPAIGNS],
    queryFn: () => campaignService.getAll(),
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
      <DataTable columns={dashboardCampaignColumns} data={items} />
    </div>
  );
};

export default CampaignDashboardPage;
