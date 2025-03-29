import { DataTable } from "@/components/shared/DataTable";
import { contributionColumns } from "./components/ContributionColumns";
import { useAppSelector } from "@/hooks/redux";
import { selectUserData } from "@/store/features/userSlice";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import donationService from "@/services/donation";
import { Spinner } from "@/components/shared/Spinner";

const ContributionsPage = () => {
  const { user } = useAppSelector(selectUserData);

  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.PROFILE_DONATIONS],
    queryFn: () => donationService.getByUserId({ userId: user!._id! }),
  });
  console.log(data);

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (!data) {
    return <div>No contributions found!</div>;
  }

  if (isError) {
    return <div>Something went wrong...</div>;
  }

  const items = data?.data?.item || [];
  return (
    <div>
      <h1 className="font-semibold text-2xl py-6">Your Contributions</h1>
      <DataTable columns={contributionColumns} data={items} />
    </div>
  );
};

export default ContributionsPage;
