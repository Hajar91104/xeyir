import DonationGrid from "@/components/shared/DonationGrid";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Campaign, Nonprofit } from "@/types";

//   {
//     image: Discover1,
//     title: "Support Jack Grivetti's Recovery",
//     donations: "1.2K",
//     currency: "$",
//     goalAmount: 45000,
//     amountRaised: 65683,
//   },
//   {
//     image: Discover2,
//     title: "UNLEASH THE FURY- For the love of Wes Johnson",
//     donations: "2.9K",
//     currency: "$",
//     goalAmount: 200000,
//     amountRaised: 170481,
//   },
//   {
//     image: Discover3,
//     title: "Support Primrose in Her Fight Against Leukaemia",
//     donations: "1.1K",
//     currency: "£",
//     goalAmount: 3000,
//     amountRaised: 26291,
//   },
//   {
//     image: Discover4,
//     title: "Rebuilding a home - Maureen Folan (McDonagh)",
//     donations: "1.3K ",
//     currency: "€",
//     goalAmount: 100000,
//     amountRaised: 59045,
//   },
//   {
//     image: Discover5,
//     title: "Justice for Mandi: Support Her Family",
//     donations: "726 ",
//     currency: "$",
//     goalAmount: 30000,
//     amountRaised: 48417,
//   },
// ];
type Props = {
  fundraisers: Campaign[];
  nonprofits: Nonprofit[];
};
const BrowseLandingPage = ({ fundraisers, nonprofits }: Props) => {
  const [activeTab, setActiveTab] = useState<"trending" | "nonprofits">(
    "trending"
  );
  const [displayedNonprofits, setDisplayedNonprofits] = useState<Nonprofit[]>(
    []
  );
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 8;

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
                        src={nonprofit.images[0]}
                        alt={nonprofit.title}
                        className="max-h-[128px] w-auto object-contain"
                      />
                    </div>
                    <h3 className="font-semibold text-2xl mb-2">
                      {nonprofit.title}
                    </h3>
                    <div className="text-sm text-secondary-foreground mb-2">
                      <p>{nonprofit.taxId}</p>
                      <p>{nonprofit.address}</p>
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
