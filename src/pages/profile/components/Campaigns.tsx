import Discover1 from "@/assets/images/discover1.jpg";
import Discover2 from "@/assets/images/discover2.jpg";
import Discover3 from "@/assets/images/discover3.jpg";
import Discover4 from "@/assets/images/discover4.jpg";
import Discover5 from "@/assets/images/discover5.jpg";
import Discover6 from "@/assets/images/discover6.jpeg";
import Discover7 from "@/assets/images/discover7.jpg";
import Discover8 from "@/assets/images/discover8.jpg";
import Discover9 from "@/assets/images/discover9.jpg";
import Discover10 from "@/assets/images/discover10.jpg";
import DonationCard from "@/components/shared/DonationCard";

interface Fundraiser {
  image: string;
  title: string;
  donations: string;
  currency: string;
  //   author: string;
  amountRaised: number;
  goalAmount: number;
}

const CampaignsSection = () => {
  const fundraisers: Fundraiser[] = [
    {
      image: Discover1,
      title: "Support Jack Grivetti's Recovery",
      donations: "1.2K",
      currency: "$",
      goalAmount: 45000,
      amountRaised: 65683,
    },
    {
      image: Discover2,
      title: "UNLEASH THE FURY- For the love of Wes Johnson",
      donations: "2.9K",
      currency: "$",
      goalAmount: 200000,
      amountRaised: 170481,
    },
    {
      image: Discover3,
      title: "Support Primrose in Her Fight Against Leukaemia",
      donations: "1.1K",
      currency: "£",
      goalAmount: 3000,
      amountRaised: 26291,
    },
    {
      image: Discover4,
      title: "Rebuilding a home - Maureen Folan (McDonagh)",
      donations: "1.3K ",
      currency: "€",
      goalAmount: 100000,
      amountRaised: 59045,
    },
    {
      image: Discover5,
      title: "Justice for Mandi: Support Her Family",
      donations: "726 ",
      currency: "$",
      goalAmount: 30000,
      amountRaised: 48417,
    },
    {
      image: Discover6,
      title: "Support Tyler and Family in Memory of Kelsey",
      donations: "1.6K ",
      currency: "$",
      goalAmount: 150000,
      amountRaised: 149770,
    },
    {
      image: Discover7,
      title: "Ted Spurrell and his road to recovery ❤️",
      donations: "995 ",
      currency: "£",
      goalAmount: 26000,
      amountRaised: 20640,
    },
    {
      image: Discover8,
      title: "Viveca Hawkins' Stroke Recovery",
      donations: "784",
      currency: "$",
      goalAmount: 100000,
      amountRaised: 69207,
    },
    {
      image: Discover9,
      title: "Support Sidhu's Family After His Sudden Loss",
      donations: "2.3K",
      currency: "$",
      goalAmount: 300000,
      amountRaised: 118001,
    },
    {
      image: Discover10,
      title: "In loving memory of Chris & JuJu & support for the Vrbesic's",
      donations: "1K",
      currency: "$",
      goalAmount: 200000,
      amountRaised: 215745,
    },
  ];

  return (
    <div>
      <h1 className="font-semibold text-2xl mt-12 mb-5">
        Campaigns you've contributed so far:
      </h1>
      <div className="grid grid-cols-4 gap-3">
        {fundraisers.map((fundraiser, index) => (
          <DonationCard
            key={index}
            fundraiser={fundraiser}
            //   className="text-white bg-transparent border-none hover:bg-[#0003]"
          />
        ))}
      </div>
    </div>
  );
};

export default CampaignsSection;
