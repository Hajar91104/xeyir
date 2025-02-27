import { DataTable } from "@/components/shared/DataTable";
import { campaignColumns } from "./components/CampaignColumns";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { paths } from "@/constants/paths";
import { useQuery } from "@tanstack/react-query";
import campaignService from "@/services/campaign";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useAppSelector } from "@/hooks/redux";
import { selectUserData } from "@/store/features/userSlice";

const CampaignPage = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector(selectUserData);

  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.PROFILE_CAMPAIGNS],
    queryFn: () => campaignService.getByUserId({ userId: user?._id! }),
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

  const items = data?.data?.item || [];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-lg sm:text-2xl py-6">
          Your Campaigns
        </h1>
        <Button onClick={() => navigate(paths.PROFILE.GOFUNDME.CREATE)}>
          Create +
        </Button>
      </div>
      <DataTable columns={campaignColumns} data={items} />
    </div>
  );
};

export default CampaignPage;
