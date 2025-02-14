import SearchIcon from "../../assets/icons/search.svg";
import { GoTriangleDown } from "react-icons/go";
import { LuMenu, LuX } from "react-icons/lu";
import { MdOutlineChevronRight } from "react-icons/md";
import { useEffect, useState } from "react";
import { PiHandHeartThin } from "react-icons/pi";
import { TbHeartHandshake } from "react-icons/tb";
import { BsInfoSquare } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { paths } from "@/constants/paths";

const Navbar = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  const handleMouseEnter = (item: string) => {
    if (timeoutId) clearTimeout(timeoutId);
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setHoveredItem(null);
    }, 100);
    setTimeoutId(timeout);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  return (
    <div
      className={`bg-transparent py-4 fixed top-0 w-full transition-colors duration-300 z-30 ${
        isScrolled ? "bg-white shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            onClick={() => navigate(paths.BROWSE)}
            className="flex items-center cursor-pointer py-1 px-2 rounded-[10px] duration-500 hover:bg-[#2525250d]"
          >
            <img
              className="h-6 w-6 lg:h-4 lg:w-4"
              src={SearchIcon}
              alt="search"
            />
            <p className="ml-2 text-secondary-foreground text-base hidden lg:block">
              Search
            </p>
          </div>
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("Donate")}
            onMouseLeave={handleMouseLeave}
          >
            <div className="items-center cursor-pointer py-1 px-2 rounded-[10px] duration-500 hover:bg-[#2525250d] hidden lg:flex">
              <p className="text-secondary-foreground text-base">Donate</p>
              <GoTriangleDown
                className={`duration-500 ${
                  hoveredItem === "Donate"
                    ? "rotate-180 fill-[#c0bdb8]"
                    : "fill-[#6f6f6f]"
                }`}
              />
            </div>

            {hoveredItem === "Donate" && (
              <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg min-w-[39.5rem] p-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-[#e5e1d7] p-2 rounded-full">
                    <PiHandHeartThin size={24} />
                  </div>
                  <h2 className="text-xl">Discover fundraisers to support</h2>
                </div>

                <div className="grid grid-cols-2 ">
                  <div className="max-w-[18.5rem] cursor-pointer p-[1rem_0.5rem] rounded-[12px] duration-500 hover:bg-[#2525250d]">
                    <h3 className="font-normal mb-1">Categories</h3>
                    <p className="text-[#6f6f6f] text-sm">
                      Browse fundraisers by category
                    </p>
                  </div>
                  <div className="max-w-[18.5rem] cursor-pointer p-[1rem_0.5rem] rounded-[12px] duration-500 hover:bg-[#2525250d]">
                    <h3 className="font-normal mb-1">Social Impact Funds</h3>
                    <p className="text-[#6f6f6f] text-sm">
                      Direct support for urgent needs
                    </p>
                  </div>
                  <div className="max-w-[18.5rem] cursor-pointer p-[1rem_0.5rem] rounded-[12px] duration-500 hover:bg-[#2525250d]">
                    <h3 className="font-normal mb-1">Crisis relief</h3>
                    <p className="text-[#6f6f6f] text-sm">
                      Donate to verified relief
                    </p>
                  </div>
                  <div className="max-w-[18.5rem] cursor-pointer p-[1rem_0.5rem] rounded-[12px] duration-500 hover:bg-[#2525250d]">
                    <h3 className="font-normal mb-1">Supporter Space</h3>
                    <p className="text-[#6f6f6f] text-sm">
                      Inspiration, FAQs, and where to give
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("Fundraise")}
            onMouseLeave={handleMouseLeave}
          >
            <div className="items-center cursor-pointer py-1 px-2 rounded-[10px] duration-500 hover:bg-[#2525250d] hidden lg:flex">
              <p className="text-secondary-foreground text-base">Fundraise</p>
              <GoTriangleDown
                className={`duration-500 ${
                  hoveredItem === "Fundraise"
                    ? "rotate-180 fill-[#c0bdb8]"
                    : "fill-[#6f6f6f]"
                }`}
              />
            </div>

            {hoveredItem === "Fundraise" && (
              <div className="absolute top-full z-50 left-0 mt-2 bg-white rounded-xl shadow-lg min-w-[39.5rem] p-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-[#e5e1d7] p-2 rounded-full">
                    <TbHeartHandshake size={24} />
                  </div>
                  <h2 className="text-xl">
                    Start fundraising, tips, and resources
                  </h2>
                </div>

                <div className="grid grid-cols-2">
                  <div className="max-w-[18.5rem] cursor-pointer p-[1rem_0.5rem] rounded-[12px] duration-500 hover:bg-[#2525250d]">
                    <h3 className="font-normal mb-1">
                      How to start a GoFundMe
                    </h3>
                    <p className="text-[#6f6f6f] text-sm">
                      Step-by-step help, examples, and more
                    </p>
                  </div>
                  <div className="max-w-[18.5rem] cursor-pointer p-[1rem_0.5rem] rounded-[12px] duration-500 hover:bg-[#2525250d]">
                    <h3 className="font-normal mb-1">Fundraising tips</h3>
                    <p className="text-[#6f6f6f] text-sm">
                      The ultimate fundraising tips guide
                    </p>
                  </div>
                  <div className="max-w-[18.5rem] cursor-pointer p-[1rem_0.5rem] rounded-[12px] duration-500 hover:bg-[#2525250d]">
                    <h3 className="font-normal mb-1">Fundraising categories</h3>
                    <p className="text-[#6f6f6f] text-sm">
                      Find the right category for you
                    </p>
                  </div>
                  <div className="max-w-[18.5rem] cursor-pointer p-[1rem_0.5rem] rounded-[12px] duration-500 hover:bg-[#2525250d]">
                    <h3 className="font-normal mb-1">Fundraising ideas</h3>
                    <p className="text-[#6f6f6f] text-sm">
                      Ideas to spark your creativity
                    </p>
                  </div>
                  <div className="max-w-[18.5rem] cursor-pointer p-[1rem_0.5rem] rounded-[12px] duration-500 hover:bg-[#2525250d]">
                    <h3 className="font-normal mb-1">Team fundraising</h3>
                    <p className="text-[#6f6f6f] text-sm">
                      Fundraise together with a team
                    </p>
                  </div>
                  <div className="max-w-[18.5rem] cursor-pointer p-[1rem_0.5rem] rounded-[12px] duration-500 hover:bg-[#2525250d]">
                    <h3 className="font-normal mb-1">Charity fundraising</h3>
                    <p className="text-[#6f6f6f] text-sm">
                      Fundraise for a charity
                    </p>
                  </div>
                  <div className="max-w-[18.5rem] cursor-pointer p-[1rem_0.5rem] rounded-[12px] duration-500 hover:bg-[#2525250d]">
                    <h3 className="font-normal mb-1">Fundraising Blog</h3>
                    <p className="text-[#6f6f6f] text-sm">
                      Resources, tips, and more
                    </p>
                  </div>
                  <div className="max-w-[18.5rem] cursor-pointer p-[1rem_0.5rem] rounded-[12px] duration-500 hover:bg-[#2525250d]">
                    <h3 className="font-normal mb-1">Sign up as a charity</h3>
                    <p className="text-[#6f6f6f] text-sm">Claim your charity</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <h1
          onClick={() => navigate(paths.HOME)}
          className="font-black text-primary-foreground text-2xl"
        >
          XEYIR
        </h1>
        <div className="flex items-center gap-2">
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("About")}
            onMouseLeave={handleMouseLeave}
          >
            <div className="items-center cursor-pointer py-1 px-2 rounded-[10px] duration-500 hover:bg-[#2525250d] hidden lg:flex">
              <p className="text-secondary-foreground text-base">About</p>
              <GoTriangleDown
                className={`duration-500 ${
                  hoveredItem === "About"
                    ? "rotate-180 fill-[#c0bdb8]"
                    : "fill-[#6f6f6f]"
                }`}
              />
            </div>

            {hoveredItem === "About" && (
              <div className="absolute top-full right-0 z-50 mt-2 bg-white rounded-xl shadow-lg min-w-[39.5rem] p-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-[#e5e1d7] p-2 rounded-full">
                    <BsInfoSquare size={24} />
                  </div>
                  <h2 className="text-xl">How it works, pricing, and more</h2>
                </div>

                <div className="grid grid-cols-2">
                  <div className="max-w-[18.5rem] cursor-pointer p-[1rem_0.5rem] rounded-[12px] duration-500 hover:bg-[#2525250d]">
                    <h3 className="font-normal mb-1">How GoFundMe works</h3>
                  </div>
                  <div className="max-w-[18.5rem] cursor-pointer p-[1rem_0.5rem] rounded-[12px] duration-500 hover:bg-[#2525250d]">
                    <h3 className="font-normal mb-1">
                      About GoFundMe and Classy
                    </h3>
                  </div>
                  <div className="max-w-[18.5rem] cursor-pointer p-[1rem_0.5rem] rounded-[12px] duration-500 hover:bg-[#2525250d]">
                    <h3 className="font-normal mb-1">
                      GoFundMe Giving Guarantee
                    </h3>
                  </div>
                  <div className="max-w-[18.5rem] cursor-pointer p-[1rem_0.5rem] rounded-[12px] duration-500 hover:bg-[#2525250d]">
                    <h3 className="font-normal mb-1">Newsroom</h3>
                  </div>
                  <div className="max-w-[18.5rem] cursor-pointer p-[1rem_0.5rem] rounded-[12px] duration-500 hover:bg-[#2525250d]">
                    <h3 className="font-normal mb-1">Supported countries</h3>
                  </div>
                  <div className="max-w-[18.5rem] cursor-pointer p-[1rem_0.5rem] rounded-[12px] duration-500 hover:bg-[#2525250d]">
                    <h3 className="font-normal mb-1">Careers</h3>
                  </div>
                  <div className="max-w-[18.5rem] cursor-pointer p-[1rem_0.5rem] rounded-[12px] duration-500 hover:bg-[#2525250d]">
                    <h3 className="font-normal mb-1">Pricing</h3>
                  </div>
                  <div className="max-w-[18.5rem] cursor-pointer p-[1rem_0.5rem] rounded-[12px] duration-500 hover:bg-[#2525250d]">
                    <h3 className="font-normal mb-1">GoFundMe.org</h3>
                  </div>
                  <div className="max-w-[18.5rem] cursor-pointer p-[1rem_0.5rem] rounded-[12px] duration-500 hover:bg-[#2525250d]">
                    <h3 className="font-normal mb-1">Help Center</h3>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className=" items-center cursor-pointer py-1 px-2 rounded-[10px] duration-500 hover:bg-[#2525250d] hidden lg:flex">
            <p className=" text-secondary-foreground text-base">Sign In</p>
          </div>
          <button
            className={`py-1 px-4 rounded-full border-[1px]  font-bold text-[14px] duration-500 hidden lg:block  ${
              isScrolled
                ? "text-white bg-primary-foreground border-primary-foreground"
                : "text-black border-[#c0bdb8] hover:bg-[#2525250d] hover:border-[#6f6f6f]"
            }`}
          >
            Create an Account
          </button>
          <button
            onClick={() => setIsMenuOpen(true)}
            className="block lg:hidden cursor-pointer py-1 px-2 rounded-[10px] duration-500 hover:bg-[#2525250d]"
          >
            <LuMenu size={24} />
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setIsMenuOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 bg-white z-50 w-[80%]">
            <div className="p-6">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-4 right-4 cursor-pointer py-1 px-2 rounded-[10px] duration-500 hover:bg-[#2525250d]"
              >
                <LuX size={24} />
              </button>

              <div className="flex flex-col space-y-4 mt-12">
                <div className="flex items-center justify-between cursor-pointer p-[1rem_0.5rem] rounded-[12px] duration-500 hover:bg-[#2525250d]">
                  <div className="flex flex-col">
                    <h2 className="text-xl font-normal">Donate</h2>
                    <p className="text-[#6f6f6f] text-[0.875rem]  mt-[2px]">
                      Discover fundraisers to support
                    </p>
                  </div>
                  <MdOutlineChevronRight size={20} />
                </div>
                <div className="flex items-center justify-between cursor-pointer p-[1rem_0.5rem] rounded-[12px] duration-500 hover:bg-[#2525250d]">
                  <div className="flex flex-col">
                    <h2 className="text-xl font-normal">Fundraise</h2>
                    <p className="text-[#6f6f6f] text-[0.875rem]  mt-[2px]">
                      Start fundraising, tips, and resources
                    </p>
                  </div>
                  <MdOutlineChevronRight size={20} />
                </div>
                <div className="flex items-center justify-between cursor-pointer p-[1rem_0.5rem] rounded-[12px] duration-500 hover:bg-[#2525250d]">
                  <div className="flex flex-col">
                    <h2 className="text-xl font-normal">About</h2>
                    <p className="text-[#6f6f6f] text-[0.875rem]  mt-[2px]">
                      How it works, pricing, and more
                    </p>
                  </div>
                  <MdOutlineChevronRight size={20} />
                </div>
                <div className="flex items-center justify-between cursor-pointer p-[1rem_0.5rem] rounded-[12px] duration-500 hover:bg-[#2525250d]">
                  <div className="flex flex-col">
                    <h2 className="text-xl font-normal">Help Center</h2>
                    <p className="text-[#6f6f6f] text-[0.875rem]  mt-[2px]">
                      Technical support and help
                    </p>
                  </div>
                  <MdOutlineChevronRight size={20} />
                </div>

                <div className="flex flex-col items-center space-y-4 mt-8">
                  <button className="w-full xs:w-[375px] transition-all delay-200 text-white bg-primary-foreground border-primary-foreground py-3 rounded-xl hover:bg-[#a31818]">
                    Start a GoFundMe
                  </button>
                  <button className="w-full xs:w-[375px] transition-all delay-200 text-black border-[1px] border-black hover:bg-[#2525250d] hover:border-[#6f6f6f] py-3 rounded-xl">
                    Sign in
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
