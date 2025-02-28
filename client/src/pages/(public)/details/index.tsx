import DetailCard from "./components/DetailCard";
import AirplaneIcon from "@/assets/images/airplane.png";
import PhoneIcon from "@/assets/images/phone.png";
import ShieldIcon from "@/assets/images/shield.png";
import RecommendationSection from "./components/Recommendation";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import campaignService from "@/services/campaign";
import { Button } from "@/components/ui/button";
import { paths } from "@/constants/paths";
import { Spinner } from "@/components/shared/Spinner";
const DetailsPage = () => {
  const { id } = useParams();
  const { data: recommendedData } = useQuery({
    queryKey: [QUERY_KEYS.CAMPAIGN_LIST],
    queryFn: () => campaignService.getAll(),
  });
  const campaigns = recommendedData?.data.items;
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.CAMPAIGN_DETAIL, id],
    queryFn: () => campaignService.getById(id!),
  });
  const recommendedCampaigns = campaigns?.filter(
    (campaign) => campaign.status === "approved"
  );
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
          <Link to={paths.HOME}>Go back</Link>
        </Button>
      </div>
    );
  }
  return (
    <div className=" mt-[64px] py-8 lg:py-16">
      <DetailCard campaign={campaign} />
      <div className="mt-12 py-[88px] bg-[#fbfaf8]">
        <div className="container">
          <h1 className="text-xl font-semibold mb-12">
            Your easy, powerful, and trusted home for help
          </h1>
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex items-center w-full  gap-4">
              <img
                src={AirplaneIcon}
                alt="airplane "
                className="w-12 h-12 object-scale-down"
              />
              <div>
                <h1 className="text-base font-semibold">Easy</h1>
                <p className="text-nowrap">Donate quickly and easily</p>
              </div>
            </div>

            <div className="flex items-center w-full justify-start gap-4">
              <img
                src={PhoneIcon}
                alt="phone "
                className="w-12 h-12 object-scale-down"
              />
              <div>
                <h1 className="text-base font-semibold">Powerful</h1>
                <p>Send help right to the people and causes you care about</p>
              </div>
            </div>

            <div className="flex items-center w-full justify-start gap-4">
              <img
                src={ShieldIcon}
                alt="shield "
                className="w-12 h-12 object-scale-down"
              />
              <div>
                <h1 className="text-base font-semibold">Trusted</h1>
                <p>
                  Your donation is protected by the GoFundMe Giving Guarantee
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RecommendationSection campaigns={recommendedCampaigns} />
    </div>
  );
};

export default DetailsPage;
