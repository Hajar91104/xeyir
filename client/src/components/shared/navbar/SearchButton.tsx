import { FC } from "react";
import SearchIcon from "@/assets/icons/search.svg";

interface SearchButtonProps {
  onClick: () => void;
  isScrolled: boolean;
}

export const SearchButton: FC<SearchButtonProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center cursor-pointer py-1 px-2 rounded-[10px] duration-500 hover:bg-[#2525250d]"
    >
      <img className="h-6 w-6 lg:h-4 lg:w-4" src={SearchIcon} alt="search" />
      <p className="ml-2 text-secondary-foreground text-base hidden lg:block">
        Search
      </p>
    </div>
  );
};
