import { useQuery } from "@tanstack/react-query";
import CheckoutCard from "./components/CheckoutCard";
import DetailImage from "@/assets/images/andrew_detail.png";
import { Link, useParams } from "react-router-dom";
import { QUERY_KEYS } from "@/constants/query-keys";
import campaignService from "@/services/campaign";
import { Spinner } from "@/components/shared/Spinner";
import { Button } from "@/components/ui/button";
import { paths } from "@/constants/paths";

const CheckoutPage = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.CAMPAIGN_DETAIL, id],
    queryFn: () => campaignService.getById(id!),
  });

  if (isLoading) {
    return (
      <div className="flex flex-col p-20 justify-center items-center mt-28">
        <Spinner />
        <p>Loading ...</p>
      </div>
    );
  }

  const campaign = data?.data?.item;

  if (isError || !campaign) {
    return (
      <div className="flex flex-col justify-center items-center mt-28">
        <p className="text-2xl font-bold mb-3">Something went wrong</p>
        <Button className="mt-4">
          <Link to={paths.BROWSE}>Go back</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-[#f4f2ec]">
      <div className="lg:container mt-[64px] py-5">
        <CheckoutCard fundraiser={campaign} />
      </div>
    </div>
  );
};

export default CheckoutPage;
