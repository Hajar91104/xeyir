import DonationCard from "@/components/shared/DonationCard";
import { Donation } from "@/types";

type Props = {
  donations: Donation[];
};

const CampaignsSection = ({ donations }: Props) => {
  console.log(donations);

  return (
    <div>
      <h1 className="font-semibold text-2xl mt-12 mb-5">
        Campaigns you've contributed so far:
      </h1>
      <div className="grid sm:grid-cols-4 grid-cols-1 gap-3">
        {donations.map((fundraiser, index) => (
          <DonationCard
            key={index}
            fundraiser={fundraiser.campaign}
            //   className="text-white bg-transparent border-none hover:bg-[#0003]"
          />
        ))}
      </div>
    </div>
  );
};

export default CampaignsSection;
