import { useEffect, useState } from "react";
import { GoTriangleDown } from "react-icons/go";
import { LuMenu } from "react-icons/lu";
import { IoIosLogOut } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

import { paths } from "@/constants/paths";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { logoutAsync, selectUserData } from "@/store/features/userSlice";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { SearchButton } from "./SearchButton";
import DonateDropdown from "./DonateDropdown";
import FundraiseDropdown from "./FundraiseDropdown";
import AboutDropdown from "./AboutDropdown";
import MobileMenu from "./MobileMenu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const navigate = useNavigate();
  const { user } = useAppSelector(selectUserData);

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
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutAsync());
  };
  function getInitials(name: string, surname: string) {
    return `${name[0].toUpperCase()}${surname[0].toUpperCase()}`;
  }
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
          <SearchButton
            onClick={() => navigate(paths.BROWSE)}
            isScrolled={isScrolled}
          />

          <div
            className="relative hidden lg:block"
            onMouseEnter={() => handleMouseEnter("Donate")}
            onMouseLeave={handleMouseLeave}
          >
            <div className="items-center cursor-pointer py-1 px-2 rounded-[10px] duration-500 hover:bg-[#2525250d] flex">
              <p className="text-secondary-foreground text-base">Donate</p>
              <GoTriangleDown
                className={`duration-500 ${
                  hoveredItem === "Donate"
                    ? "rotate-180 fill-[#c0bdb8]"
                    : "fill-[#6f6f6f]"
                }`}
              />
            </div>
            <DonateDropdown hoveredItem={hoveredItem} />
          </div>

          <div
            className="relative hidden lg:block"
            onMouseEnter={() => handleMouseEnter("Fundraise")}
            onMouseLeave={handleMouseLeave}
          >
            <div className="items-center cursor-pointer py-1 px-2 rounded-[10px] duration-500 hover:bg-[#2525250d] flex">
              <p className="text-secondary-foreground text-base">Fundraise</p>
              <GoTriangleDown
                className={`duration-500 ${
                  hoveredItem === "Fundraise"
                    ? "rotate-180 fill-[#c0bdb8]"
                    : "fill-[#6f6f6f]"
                }`}
              />
            </div>
            <FundraiseDropdown hoveredItem={hoveredItem} />
          </div>
        </div>

        <h1
          onClick={() => navigate(paths.HOME)}
          className="font-black text-primary-foreground cursor-pointer text-2xl"
        >
          XEYIR
        </h1>

        <div className="flex items-center gap-2">
          <div
            className="relative hidden lg:block"
            onMouseEnter={() => handleMouseEnter("About")}
            onMouseLeave={handleMouseLeave}
          >
            <div className="items-center cursor-pointer py-1 px-2 rounded-[10px] duration-500 hover:bg-[#2525250d] flex">
              <p className="text-secondary-foreground text-base">About</p>
              <GoTriangleDown
                className={`duration-500 ${
                  hoveredItem === "About"
                    ? "rotate-180 fill-[#c0bdb8]"
                    : "fill-[#6f6f6f]"
                }`}
              />
            </div>
            <AboutDropdown hoveredItem={hoveredItem} />
          </div>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="hidden lg:flex">
                  <AvatarFallback>
                    {getInitials(user.name, user.surname)}{" "}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to={paths.PROFILE.MAIN}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to={paths.PROFILE.CONTRIBUTIONS}>Contributions</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to={paths.PROFILE.GOFUNDME.LIST}>Campaigns</Link>
                </DropdownMenuItem>
                {user.role === "admin" && (
                  <DropdownMenuItem>
                    <Link to={paths.DASHBOARD.MAIN}>Dashboard</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  className="bg-gray-100"
                  onClick={handleLogout}
                >
                  <div className="flex items-center gap-1 ">
                    <IoIosLogOut />
                    Logout
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <div
                onClick={() => navigate(paths.LOGIN)}
                className="items-center cursor-pointer py-1 px-2 rounded-[10px] duration-500 hover:bg-[#2525250d] hidden lg:flex"
              >
                <p className="text-secondary-foreground text-base">Sign In</p>
              </div>
              <button
                onClick={() => navigate(paths.REGISTER)}
                className={`py-1 px-4 rounded-full border-[1px] font-bold text-[14px] duration-500 hidden lg:block ${
                  isScrolled
                    ? "text-white bg-primary-foreground border-primary-foreground"
                    : "text-black border-[#c0bdb8] hover:bg-[#2525250d] hover:border-[#6f6f6f]"
                }`}
              >
                Create an Account
              </button>
            </>
          )}

          <button
            onClick={() => setIsMenuOpen(true)}
            className="block lg:hidden cursor-pointer py-1 px-2 rounded-[10px] duration-500 hover:bg-[#2525250d]"
          >
            <LuMenu size={24} />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <MobileMenu
          closeMenu={() => setIsMenuOpen(false)}
          user={user}
          navigate={navigate}
        />
      )}
    </div>
  );
};

export default Navbar;
