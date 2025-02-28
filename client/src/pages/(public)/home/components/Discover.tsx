import { useState } from "react";

import DonationGrid from "@/components/shared/DonationGrid";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import campaignService from "@/services/campaign";
import { Spinner } from "@/components/shared/Spinner";

export default function DiscoverSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: recommendedData, isLoading: recommendedLoading } = useQuery({
    queryKey: [QUERY_KEYS.CAMPAIGN_LIST],
    queryFn: () => campaignService.getAll(),
  });
  const campaigns = recommendedData?.data.items;
  const recommendedCampaigns = campaigns?.filter(
    (campaign) => campaign.status === "approved"
  );
  if (!recommendedCampaigns || recommendedLoading) {
    return (
      <div className="flex flex-col p-20 justify-center items-center mt-28">
        <Spinner />
        <p>Loading ...</p>
      </div>
    );
  }

  return (
    <div className=" container">
      <h2 className="text-[22px] lg:text-[28px] font-semibold mt-8 lg:mt-12 mb-6 lg:mb-10">
        Discover fundraisers inspired by what you care about
      </h2>
      <div className="flex flex-col lg:flex-row justify-between items-center mb-6 lg:mb-8 gap-4">
        <button className="text-[#252525] font-bold rounded-3xl py-1 px-6 border border-[#c0bdb8] cursor-none">
          Happening worldwide
        </button>
        <div className="flex items-center gap-2">
          <button
            className="border disabled:border-[#e5e1d7] disabled:text-[#c0bdb8] rounded-full w-8 h-8 text-[#252525] border-[#c0bdb8] hover:bg-[#2525250d] "
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            ←
          </button>
          <button
            className="border disabled:border-[#e5e1d7] disabled:text-[#c0bdb8] rounded-full w-8 h-8 text-[#252525] border-[#c0bdb8] hover:bg-[#2525250d] "
            onClick={() => setCurrentPage(2)}
            disabled={currentPage === 2}
          >
            →
          </button>
        </div>
      </div>
      <div>
        <DonationGrid fundraisers={recommendedCampaigns} />
      </div>
    </div>
  );
}
