import SearchIcon from "@/assets/icons/search.svg";
import { FiDelete } from "react-icons/fi";
import { useState } from "react";
import BrowseLandingPage from "./components/Landing";
import SearchedSection from "./components/Searched";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import campaignService from "@/services/campaign";
import { Spinner } from "@/components/shared/Spinner";
import nonprofitService from "@/services/nonprofit";

let timeoutId: NodeJS.Timeout;

const BrowsePage = () => {
  const [searchText, setSearchText] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClear = () => {
    setSearchText("");
  };
  function handleSearch(searchText: string) {
    clearTimeout(timeoutId);
    if (!searchText) {
      searchParams.delete("search");
      setSearchParams(searchParams);
      return;
    }
    timeoutId = setTimeout(() => {
      searchParams.set("search", searchText);
      setSearchParams(searchParams);
      // if (!isListingPage) navigate(paths.LIST + `?${searchParams.toString()}`);
    }, 300);
  }

  const { data: recommendedData, isLoading: recommendedLoading } = useQuery({
    queryKey: [QUERY_KEYS.CAMPAIGN_LIST],
    queryFn: () => campaignService.getAll(),
  });
  const { data: nonprofitData, isLoading: nonprofitLoading } = useQuery({
    queryKey: [QUERY_KEYS.NONPROFIT_LIST],
    queryFn: () => nonprofitService.getAll(),
  });
  const campaigns = recommendedData?.data.items;
  const nonprofits = nonprofitData?.data.items;
  const recommendedCampaigns = campaigns?.filter(
    (campaign) => campaign.status === "approved"
  );
  if (
    !recommendedCampaigns ||
    recommendedLoading ||
    !nonprofits ||
    nonprofitLoading
  ) {
    return (
      <div className="flex flex-col p-20 justify-center items-center mt-28">
        <Spinner />
        <p>Loading ...</p>
      </div>
    );
  }

  return (
    <div className="mt-[64px] container">
      <div className="pt-16 flex flex-col items-center">
        <h1 className=" text-[28px] lg:text-[32px] text-center font-semibold">
          Find fundraisers and nonprofits
        </h1>
        <p className="text-[rgb(111,111,111)] text-center text-base my-4">
          Find fundraisers by person's name, location, title, or keyword
        </p>
        <div className="bg-[#f4f2ec] rounded-[6.25rem] flex items-center w-full lg:w-[556px] h-12 px-4 relative">
          <img src={SearchIcon} alt="search" className="absolute h-4 w-4" />
          <input
            className="bg-[#f4f2ec] ml-10 w-full text-base outline-none"
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={(e) => {
              handleSearch(e.target.value.trim());
              setSearchText(e.target.value);
            }}
          />
          {searchText && (
            <button
              onClick={handleClear}
              className="rounded-full flex items-center justify-center h-8 w-8 hover:bg-[#2525250d]"
            >
              <FiDelete className="h-4 w-4 cursor-pointer text-black" />
            </button>
          )}
        </div>
      </div>
      {searchText === "" && (
        <BrowseLandingPage
          fundraisers={recommendedCampaigns}
          nonprofits={nonprofits}
        />
      )}
      {searchText !== "" && <SearchedSection />}
    </div>
  );
};

export default BrowsePage;
