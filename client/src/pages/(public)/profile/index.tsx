import { useAppSelector } from "@/hooks/redux";
import CampaignsSection from "./components/Campaigns";
import StatisticsSection from "./components/Statistics";
import { selectUserData } from "@/store/features/userSlice";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import donationService from "@/services/donation";
import { Spinner } from "@/components/shared/Spinner";

const ProfilePage = () => {
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
  return (
    <div>
      <StatisticsSection />
      <CampaignsSection donations={donations} />
    </div>
  );
};

export default ProfilePage;
