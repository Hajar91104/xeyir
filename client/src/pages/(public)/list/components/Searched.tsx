import { ChevronDown, X } from "lucide-react";
import { MdOutlineTune } from "react-icons/md";
import SearchIcon from "@/assets/icons/search.svg";
import { FiDelete } from "react-icons/fi";

import { useMemo, useState, useEffect, useRef } from "react";
import { Switch } from "@/components/ui/switch";
import DonationCard from "@/components/shared/DonationCard";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import locationService from "@/services/location";
import { IoLocationOutline } from "react-icons/io5";
import categoryService from "@/services/category";
import { useSearchParams } from "react-router-dom";
import { QUERY_KEYS } from "@/constants/query-keys";
import campaignService from "@/services/campaign";
import { LIST_TAKE_COUNT } from "@/constants";
import { Campaign } from "@/types";
import DonationCardSkeleton from "@/components/shared/CardSkeleton";

export default function SearchedSection() {
  const [visibleItems, setVisibleItems] = useState(8);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<string>("all");
  const [isCloseToGoal, setIsCloseToGoal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const [locationSearch, setLocationSearch] = useState("");
  const [isLocationFocused, setIsLocationFocused] = useState(false);
  const locationInputRef = useRef<HTMLDivElement>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const { data, isLoading } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.CAMPAIGN_LIST, searchParams.toString()],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      campaignService.getAll(
        {
          take: LIST_TAKE_COUNT,
          skip: pageParam,
        },
        searchParams.toString()
      ),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const hasNextPage =
        lastPage.data.total > lastPage.data.skip + lastPage.data.take;

      if (!hasNextPage) return null;
      return lastPage.data.skip + lastPage.data.take;
    },
  });

  const campaigns = useMemo(() => {
    if (!data) return [];
    return data.pages.reduce((prev: Campaign[], page) => {
      return [...prev, ...page.data.items];
    }, []);
  }, [data]);

  const { data: locationsResponse } = useQuery({
    queryKey: ["location"],
    queryFn: locationService.getAll,
  });
  const locationsOptions = useMemo(() => {
    if (!locationsResponse) return [];
    return locationsResponse.data.items.map((location: any) => ({
      value: location._id,
      label: location.name,
    }));
  }, [locationsResponse]);

  const { data: categoryResponse } = useQuery({
    queryKey: ["category"],
    queryFn: categoryService.getAll,
  });
  const categoriesOptions = useMemo(() => {
    if (!categoryResponse) return [];
    return categoryResponse.data.items.map((category: any) => ({
      value: category._id,
      label: category.name,
    }));
  }, [categoryResponse]);

  const displayedFundraisers = campaigns.filter(
    (campaign) => campaign.status === "approved"
  );
  const totalResults = displayedFundraisers.length;

  function handleChange(type: string, option: string | string[]) {
    searchParams.delete(type.toLowerCase());

    if (Array.isArray(option)) {
      option.forEach((v) => {
        if (v) {
          searchParams.append(type.toLowerCase(), v);
        }
      });
    } else {
      if (option) {
        searchParams.append(type.toLowerCase(), option);
      }
    }

    setSearchParams(searchParams);
  }

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) => {
      const updated = prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category];

      handleChange("category", updated);
      return updated;
    });
  };

  const handleLocationFocus = () => {
    setIsLocationFocused(true);
  };

  const handleLocationBlur = (e: MouseEvent) => {
    if (
      locationInputRef.current &&
      !locationInputRef.current.contains(e.target as Node)
    ) {
      setIsLocationFocused(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleLocationBlur);
    return () => {
      document.removeEventListener("mousedown", handleLocationBlur);
    };
  }, []);

  const isLocationActive = locationSearch !== "";
  const isCategoryActive = selectedCategories.length > 0;
  const isTimeActive = selectedTimePeriod !== "all";

  const handleShowMore = () => {
    setVisibleItems((prev) => Math.min(prev + 8, campaigns.length));
  };

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
    setSearchText("");

    searchParams.delete("location");
    searchParams.delete("category");
    searchParams.delete("close_to_goal");
    searchParams.delete("time_period");
    setSearchParams(searchParams);
  };

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

          <div className="mb-16 relative" ref={locationInputRef}>
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
                onChange={(e) => {
                  setSearchText(e.target.value);
                  handleChange("location", e.target.value);
                }}
                onFocus={handleLocationFocus}
              />
              {searchText && (
                <button
                  onClick={() => {
                    handleClear();
                    handleChange("location", "");
                  }}
                  className="rounded-full flex items-center justify-center h-8 w-8 hover:bg-[#2525250d]"
                >
                  <FiDelete className="h-4 w-4 cursor-pointer text-black" />
                </button>
              )}
            </div>
            {isLocationFocused && (
              <div className="absolute mt-3 bg-white shadow-md p-5 rounded-xl flex flex-col gap-3 w-full">
                {locationsOptions.map((location) => (
                  <div
                    className={
                      "cursor-pointer p-[0.25rem_0.5rem] flex items-center gap-2 rounded-lg transition-all  duration-300 hover:bg-[#2525250d]"
                    }
                    key={location.value}
                    onClick={() => {
                      setSearchText(location.label);
                      handleChange("location", location.value);
                      setIsLocationFocused(false);
                    }}
                  >
                    <IoLocationOutline />
                    <p>{location.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mb-16">
            <h3 className="font-semibold mb-2">Category</h3>
            <p className="text-[#6b6966] text-sm mb-2">Choose one or more</p>
            <div className="flex flex-wrap gap-2">
              {categoriesOptions.map((category) => (
                <button
                  key={category.value}
                  onClick={() => toggleCategory(category.value)}
                  className={`px-4 py-2 rounded-full border transition-all duration-300 ${
                    selectedCategories.includes(category.value)
                      ? "border-[#252525] bg-[#252525] text-white"
                      : "border-[#e5e1d7] hover:bg-[#2525250d]"
                  }`}
                >
                  {category.label}
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
              <Switch
                onClick={() => {
                  setIsCloseToGoal(!isCloseToGoal);
                  handleChange("close_to_goal", (!isCloseToGoal).toString());
                }}
                checked={isCloseToGoal}
              />
            </div>
          </div>

          <div className="mb-16">
            <h3 className="font-semibold mb-2">Time period</h3>
            <div className="flex flex-col gap-2">
              {timePeriods.map((period) => (
                <button
                  key={period.id}
                  onClick={() => {
                    setSelectedTimePeriod(period.id);
                    handleChange("time_period", period.id);
                  }}
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

      <div className="py-8">
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
                    onChange={(e) => {
                      setLocationSearch(e.target.value);
                      handleChange("location", e.target.value);
                    }}
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
                    {categoriesOptions.map((cat) => (
                      <button
                        key={cat.value}
                        onClick={() => toggleCategory(cat.value)}
                        className={`px-4 py-2 rounded-full border transition-all duration-300 ${
                          selectedCategories.includes(cat.value)
                            ? "border-[#252525] bg-[#252525] text-white"
                            : "border-[#e5e1d7] hover:bg-[#2525250d]"
                        }`}
                      >
                        {cat.label}
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
                          handleChange("time_period", period.id);
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

            <button
              className="px-4 py-2 rounded-full border border-[#c0bdb8] hover:bg-[#fbfaf8] hover:border-secondary-foreground duration-500"
              onClick={() => {
                /* If you also want to store this in params:
                 * handleSingleParamChange("nonprofits", "true");
                 */
              }}
            >
              <span className="font-medium text-[14px]">Nonprofits</span>
            </button>

            <button
              onClick={() => {
                setIsCloseToGoal(!isCloseToGoal);
                handleChange("close_to_goal", (!isCloseToGoal).toString());
              }}
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
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <DonationCardSkeleton key={index} />
              ))
            : displayedFundraisers.map((fundraiser, index) => (
                <DonationCard fundraiser={fundraiser} key={index} />
              ))}
        </div>
        <p className="text-sm font-bold w-full text-center mb-8">
          Showing {displayedFundraisers.length} of {totalResults} results
        </p>

        {visibleItems < campaigns.length && (
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
}
