import DonationGrid from "@/components/shared/DonationGrid";
import Discover1 from "@/assets/images/discover1.jpg";
import Discover2 from "@/assets/images/discover2.jpg";
import Discover3 from "@/assets/images/discover3.jpg";
import Discover4 from "@/assets/images/discover4.jpg";
import Discover5 from "@/assets/images/discover5.jpg";
import { Card, CardContent } from "@/components/ui/card";
import AmericanCancerSocietyLogo from "@/assets/images/american_cancer_society.jpg";
import UnicefUsaLogo from "@/assets/images/unicef.png";
import HumanRightsCampaignLogo from "@/assets/images/human_rights_campaign.png";
import RedCrossLogo from "@/assets/images/red_cross.jpeg";
import StandUpToCancerLogo from "@/assets/images/Stand_up_to_Cancer_logo.svg.png";
import ChicagoBlackhawksLogo from "@/assets/images/blackhawks.png";
import CaliforniaCommunityFoundationLogo from "@/assets/images/california_community.png";
import WorldCentralKitchenLogo from "@/assets/images/world_central_kitchen.png";
import FNLogo from "@/assets/images/fn.jpeg";
import WylderNationLogo from "@/assets/images/wylder_nation.png";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

interface Nonprofit {
  logo: string;
  name: string;
  ein: string;
  location: string;
  description: string;
}

const fundraisers = [
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
];

const BrowseLandingPage = () => {
  const [activeTab, setActiveTab] = useState<
    "trending" | "near" | "nonprofits"
  >("trending");
  const [displayedNonprofits, setDisplayedNonprofits] = useState<Nonprofit[]>(
    []
  );
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 8;

  const nonprofits: Nonprofit[] = [
    {
      logo: AmericanCancerSocietyLogo,
      name: "American Cancer Society",
      ein: "EIN: 131788491",
      location: "Kennesaw, GA",
      description:
        "Improve the lives of people with cancer and their families through advocacy, research, and patient support, to ensure everyone has an opportunity to prevent, detect, treat, and survive cancer",
    },

    {
      logo: UnicefUsaLogo,
      name: "UNICEF USA",
      ein: "EIN: 131760110",
      location: "new york, NY",
      description:
        "UNICEF USA's mission is to relentlessly pursue a more equitable world for every child.  UNICEF USA advances the global mission of UNICEF by rallying the American public to support the world's most vulnerable children.",
    },
    {
      logo: HumanRightsCampaignLogo,
      name: "Human Rights Campaign",
      ein: "EIN: 521481896",
      location: "Washington, DC",
      description:
        "Human Rights Campaign is the largest civil rights organization working to achieve equality for lesbian, gay, bisexual, transgender and queer Americans.",
    },
    {
      logo: RedCrossLogo,
      name: "American Red Cross",
      ein: "EIN: 530196605",
      location: "Washington, DC",
      description:
        "The American Red Cross prevents and alleviates human suffering in the face of emergencies by mobilizing the power of volunteers and the generosity of donors.",
    },
    {
      logo: StandUpToCancerLogo,
      name: "Stand Up To Cancer",
      ein: "EIN: 884115555",
      location: "Los Angeles, CA",
      description:
        "Stand Up To Cancer's mission is to raise funds to accelerate the pace of groundbreaking research that gets new therapies to patients quickly and saves lives now. SU2C brings together the best and the brightest",
    },
    {
      logo: ChicagoBlackhawksLogo,
      name: "Chicago Blackhawks",
      ein: "EIN: 203871291",
      location: "Chicago, IL",
      description:
        "As the official 501(c)(3) charity of the Chicago Blackhawks, the Chicago Blackhawks Foundation is proud to bring hope to the communities that make our city so special. Our commitment is to provide access to the",
    },
    {
      logo: CaliforniaCommunityFoundationLogo,
      name: "California Community Foundation",
      ein: "EIN: 953510055",
      location: "Los Angeles, CA",
      description:
        "For more than 100 years, the California Community Foundation (CCF) has worked to transform generosity into impact and create a stronger future for Los Angeles County. Working closely with donors, nonprofits and",
    },
    {
      logo: WorldCentralKitchenLogo,
      name: "World Central Kitchen",
      ein: "EIN: 273521132",
      location: "Washington, DC",
      description:
        "Founded in 2010 by Chef José Andrés, World Central Kitchen (WCK) is first to the frontlines providing fresh meals in response to crises. Applying our model of quick action, leveraging local resources, and adapting in real time, WCK has served hundreds of millions nourishing meals around the world. When disaster strikes,",
    },
    {
      logo: FNLogo,
      name: "FN Foundation",
      ein: "EIN: 82-3813993",
      location: "New York, NY",
      description:
        "the purpose of our charity is to help people who are in real hunger and striving to make it through",
    },
    {
      logo: WylderNationLogo,
      name: "Wylder Nation Foundation",
      ein: "EIN: 46-2849095",
      location: "SCOTTSDALE, AZ",
      description:
        "Wylder Nation Foundation is a 501(c)3 non-profit organization determined to improve the lives of",
    },
  ];

  useEffect(() => {
    setDisplayedNonprofits(nonprofits.slice(0, itemsPerPage));
  }, []);

  const fetchMoreData = () => {
    if (displayedNonprofits.length >= nonprofits.length) {
      setHasMore(false);
      return;
    }

    setTimeout(() => {
      const nextItems = nonprofits.slice(
        displayedNonprofits.length,
        displayedNonprofits.length + itemsPerPage
      );
      setDisplayedNonprofits([...displayedNonprofits, ...nextItems]);
    }, 500);
  };

  return (
    <div className="py-12">
      <div className="flex items-center justify-start lg:gap-2 mb-4">
        <button
          onClick={() => setActiveTab("trending")}
          className={` h-10 transition-all duration-200 p-[8px_16px] font-bold text-sm lg:text-base rounded-full  ${
            activeTab === "trending"
              ? "bg-secondary-foreground text-white"
              : "text-secondary hover:bg-[#f4f2ec]"
          }`}
        >
          Trending
        </button>
        <button
          onClick={() => setActiveTab("near")}
          className={` h-10 transition-all duration-200 p-[8px_16px] text-nowrap font-bold text-sm lg:text-base rounded-full  ${
            activeTab === "near"
              ? "bg-secondary-foreground text-white"
              : "text-secondary hover:bg-[#f4f2ec]"
          }`}
        >
          Near You
        </button>

        <button
          onClick={() => setActiveTab("nonprofits")}
          className={` h-10 transition-all duration-200 p-[8px_16px] font-bold text-sm lg:text-base rounded-full  ${
            activeTab === "nonprofits"
              ? "bg-secondary-foreground text-white"
              : "text-secondary hover:bg-[#f4f2ec]"
          }`}
        >
          Nonprofits
        </button>
      </div>
      {activeTab === "trending" && <DonationGrid fundraisers={fundraisers} />}

      {activeTab === "nonprofits" && (
        <InfiniteScroll
          dataLength={displayedNonprofits.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          }
          endMessage={
            <p className="text-center text-gray-500 py-4">
              No more nonprofits to load.
            </p>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayedNonprofits.map((nonprofit, index) => (
              <Card
                key={index}
                className="p-4 border border-[#e5e1d7] rounded-3xl overflow-hidden cursor-pointer hover:bg-[#fbfaf8] transition-all duration-300"
              >
                <CardContent className="flex flex-col justify-between gap-4">
                  <div>
                    <div className="h-32 w-full flex items-center justify-center mb-4">
                      <img
                        src={nonprofit.logo}
                        alt={nonprofit.name}
                        className="max-h-[128px] w-auto object-contain"
                      />
                    </div>
                    <h3 className="font-semibold text-2xl mb-2">
                      {nonprofit.name}
                    </h3>
                    <div className="text-sm text-secondary-foreground mb-2">
                      <p>{nonprofit.ein}</p>
                      <p>{nonprofit.location}</p>
                    </div>
                  </div>

                  <p className="text-sm text-start text-secondary-foreground line-clamp-3">
                    {nonprofit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default BrowseLandingPage;
