import { DataTable } from "@/components/shared/DataTable";
import { dashboardCampaignColumns } from "./components/DashboardCampaignColumns";
import CampaignImage from "@/assets/images/campaign.jpg";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/hooks/redux";
import { selectUserData } from "@/store/features/userSlice";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import campaignService from "@/services/campaign";

const CampaignDashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector(selectUserData);

  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.DASHBOARD_CAMPAIGNS],
    queryFn: () => campaignService.getAll(),
  });
  console.log(data);

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center">
  //       <Spinner />
  //     </div>
  //   );
  // }

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
