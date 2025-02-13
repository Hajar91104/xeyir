import { ChevronDown, X } from "lucide-react";
import { MdOutlineTune } from "react-icons/md";
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
import SearchIcon from "@/assets/icons/search.svg";
import { FiDelete } from "react-icons/fi";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
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

const SearchedSection = () => {
  const [visibleItems, setVisibleItems] = useState(8);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<string>("all");
  const [isCloseToGoal, setIsCloseToGoal] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

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

  const totalResults = 500;
  const displayedFundraisers = fundraisers.slice(0, visibleItems);

  const handleShowMore = () => {
    setVisibleItems((prev) => Math.min(prev + 8, fundraisers.length));
  };

  const categories = [
    "Education",
    "Animals",
    "Environment",
    "Business",
    "Medical",
    "Funeral",
    "Emergency",
    "Community",
  ];

  const timePeriods = [
    { id: "all", label: "All time" },
    { id: "24h", label: "Past 24 hours" },
    { id: "7d", label: "Past 7 days" },
    { id: "30d", label: "Past 30 days" },
    { id: "12m", label: "Past 12 months" },
  ];

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedTimePeriod("all");
    setIsCloseToGoal(false);
    setLocationSearch("");
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };
  const [searchText, setSearchText] = useState("");

  const handleClear = () => {
    setSearchText("");
  };

  const handleDropdownClick = (dropdown: string) => {
    if (openDropdown === dropdown) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(dropdown);
    }
  };

  const isLocationActive = locationSearch !== "";
  const isCategoryActive = selectedCategories.length > 0;
  const isTimeActive = selectedTimePeriod !== "all";

  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 w-[400px] bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          showFilters ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 h-full overflow-y-auto pb-32">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-base font-bold">Filters</h2>
            <button
              onClick={() => setShowFilters(false)}
              className="p-2 hover:bg-[#2525250d] rounded-full duration-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="mb-16">
            <h3 className="font-bold">Location</h3>
            <p className="text-secondary text-base mb-6">
              Search for any city or zip code worldwide
            </p>
            <div className="bg-[#f4f2ec] rounded-[6.25rem] flex items-center  h-12 px-4 relative">
              <img src={SearchIcon} alt="search" className="absolute h-4 w-4" />
              <input
                className="bg-[#f4f2ec] ml-10 w-full text-base outline-none"
                type="text"
                placeholder="Search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
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

          <div className="mb-16">
            <h3 className="font-semibold mb-2">Category</h3>
            <p className="text-[#6b6966] text-sm mb-2">Choose one or more</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`px-4 py-2 rounded-full border transition-all duration-300 ${
                    selectedCategories.includes(category)
                      ? "border-[#252525] bg-[#252525] text-white"
                      : "border-[#e5e1d7] hover:bg-[#2525250d]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Close to goal</h3>
                <p className="text-[#6b6966] text-sm">$50 or less needed</p>
              </div>
              {/* <button
                onClick={() => setIsCloseToGoal(!isCloseToGoal)}
                className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                  isCloseToGoal ? "bg-[#252525]" : "bg-[#e5e1d7]"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transform transition-transform duration-300 ${
                    isCloseToGoal ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button> */}
              <Switch />
            </div>
          </div>

          <div className="mb-16">
            <h3 className="font-semibold mb-2">Time period</h3>
            <div className="flex flex-col gap-2">
              {timePeriods.map((period) => (
                <button
                  key={period.id}
                  onClick={() => setSelectedTimePeriod(period.id)}
                  className={`p-[0.25rem_0.5rem] text-left rounded-lg transition-all w-fit duration-300 hover:bg-[#2525250d] ${
                    selectedTimePeriod === period.id ? "font-bold" : ""
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 w-[400px] p-6 bg-white border-t border-[#e5e1d7]">
          <div className="flex gap-4">
            <button
              onClick={resetFilters}
              className="flex-1 py-3 rounded-full border border-[#e5e1d7] hover:bg-[#2525250d] duration-500"
            >
              Reset
            </button>
            <button
              onClick={() => setShowFilters(false)}
              className="flex-1 py-3 rounded-full bg-[#252525] text-white hover:bg-[#252525]/90 duration-500"
            >
              See results
            </button>
          </div>
        </div>
      </div>

      {showFilters && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setShowFilters(false)}
        />
      )}

      <div className=" py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setShowFilters(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
              isLocationActive ||
              isCategoryActive ||
              isTimeActive ||
              isCloseToGoal
                ? "border-[#252525] bg-[#252525] text-white"
                : "border-[#c0bdb8] hover:bg-[#fbfaf8] hover:border-secondary-foreground"
            }`}
          >
            <span className="font-medium text-[14px]">
              {isLocationActive ||
              isCategoryActive ||
              isTimeActive ||
              isCloseToGoal
                ? `${
                    [
                      isLocationActive,
                      isCategoryActive,
                      isTimeActive,
                      isCloseToGoal,
                    ].filter(Boolean).length
                  } Filters`
                : "Filters"}
            </span>
            <MdOutlineTune className="h-4 w-4" />
          </button>

          <div className="hidden lg:flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => handleDropdownClick("location")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                  isLocationActive
                    ? "border-[#252525] bg-[#252525] text-white"
                    : "border-[#c0bdb8] hover:bg-[#fbfaf8] hover:border-secondary-foreground"
                }`}
              >
                <span className="font-medium text-[14px]">
                  {locationSearch || "Location"}
                </span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {openDropdown === "location" && (
                <div className="absolute top-full mt-2 w-[300px] bg-white rounded-xl shadow-lg p-4 z-40 border border-[#e5e1d7]">
                  <h3 className="font-semibold mb-2">Location</h3>
                  <p className="text-[#6b6966] text-sm mb-2">
                    Search for any city or zip code worldwide
                  </p>
                  <input
                    type="text"
                    value={locationSearch}
                    onChange={(e) => setLocationSearch(e.target.value)}
                    placeholder="City or zip code"
                    className="w-full p-3 rounded-lg border border-[#e5e1d7] focus:outline-none focus:border-[#2525250d]"
                  />
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => handleDropdownClick("category")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                  selectedCategories.length > 0
                    ? "border-[#252525] bg-[#252525] text-white"
                    : "border-[#c0bdb8] hover:bg-[#fbfaf8] hover:border-secondary-foreground"
                }`}
              >
                <span className="font-medium text-[14px]">
                  {selectedCategories.length > 0
                    ? `${selectedCategories.length} Category`
                    : "Category"}
                </span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {openDropdown === "category" && (
                <div className="absolute top-full mt-2 w-[300px] bg-white rounded-xl shadow-lg p-4 z-40 border border-[#e5e1d7]">
                  <h3 className="font-semibold mb-2">Category</h3>
                  <p className="text-[#6b6966] text-sm mb-2">
                    Choose one or more
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => toggleCategory(category)}
                        className={`px-4 py-2 rounded-full border transition-all duration-300 ${
                          selectedCategories.includes(category)
                            ? "border-[#252525] bg-[#252525] text-white"
                            : "border-[#e5e1d7] hover:bg-[#2525250d]"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => handleDropdownClick("time")}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                  selectedTimePeriod !== "all"
                    ? "border-[#252525] bg-[#252525] text-white"
                    : "border-[#c0bdb8] hover:bg-[#fbfaf8] hover:border-secondary-foreground"
                }`}
              >
                <span className="font-medium text-[14px]">
                  {timePeriods.find((p) => p.id === selectedTimePeriod)
                    ?.label || "All time"}
                </span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {openDropdown === "time" && (
                <div className="absolute top-full mt-2 w-[200px] bg-white rounded-xl shadow-lg p-4 z-40 border border-[#e5e1d7]">
                  <div className="flex flex-col gap-2">
                    {timePeriods.map((period) => (
                      <button
                        key={period.id}
                        onClick={() => {
                          setSelectedTimePeriod(period.id);
                          setOpenDropdown(null);
                        }}
                        className={`px-4 py-2 text-left rounded-lg transition-all duration-300 ${
                          selectedTimePeriod === period.id
                            ? "bg-[#2525250d] font-semibold"
                            : "hover:bg-[#2525250d]"
                        }`}
                      >
                        {period.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button className="px-4 py-2 rounded-full border border-[#c0bdb8] hover:bg-[#fbfaf8] hover:border-secondary-foreground duration-500">
              <span className="font-medium text-[14px]">Nonprofits</span>
            </button>

            <button
              onClick={() => setIsCloseToGoal(!isCloseToGoal)}
              className={`px-4 py-2 rounded-full border transition-all duration-300 ${
                isCloseToGoal
                  ? "border-[#252525] bg-[#252525] text-white"
                  : "border-[#c0bdb8] hover:bg-[#fbfaf8] hover:border-secondary-foreground"
              }`}
            >
              <span className="font-medium text-[14px]">Close to goal</span>
            </button>

            {(isLocationActive ||
              isCategoryActive ||
              isTimeActive ||
              isCloseToGoal) && (
              <button
                onClick={resetFilters}
                className="bg-transparent underline ml-4 text-sm hover:text-gray-600"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>

        {openDropdown && (
          <div
            className="fixed inset-0 z-30"
            onClick={() => setOpenDropdown(null)}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {displayedFundraisers.map((fundraiser, index) => (
            <DonationCard fundraiser={fundraiser} key={index} />
          ))}
        </div>
        <p className="text-sm font-bold w-full text-center mb-8">
          Showing {displayedFundraisers.length} of {totalResults}+ results
        </p>

        {visibleItems < fundraisers.length && (
          <div className="flex justify-center">
            <button
              onClick={handleShowMore}
              className="px-6 py-3 rounded-full border border-[#e5e1d7] hover:bg-[#2525250d] duration-500 font-medium"
            >
              Show more
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchedSection;
