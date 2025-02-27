import { LuX } from "react-icons/lu";
import { MdOutlineChevronRight } from "react-icons/md";
import { User } from "@/types"; // Or wherever your User type is declared
import { paths } from "@/constants/paths";

interface MobileMenuProps {
  closeMenu: () => void;
  user: User | null;
  navigate: (path: string) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  closeMenu,
  user,
  navigate,
}) => {
  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={closeMenu}
      />
      <div className="fixed inset-y-0 right-0 bg-white z-50 w-[80%]">
        <div className="p-6 relative h-full">
          <button
            onClick={closeMenu}
            className="absolute top-4 right-4 cursor-pointer py-1 px-2 rounded-[10px] duration-500 hover:bg-[#2525250d]"
          >
            <LuX size={24} />
          </button>

          <div className="flex flex-col space-y-4 mt-12">
            {/* Donate */}
            <div className="flex items-center justify-between cursor-pointer p-[1rem_0.5rem] rounded-[12px] duration-500 hover:bg-[#2525250d]">
              <div
                onClick={() => navigate(paths.BROWSE)}
                className="flex flex-col"
              >
                <h2 className="text-xl font-normal">Donate</h2>
                <p className="text-[#6f6f6f] text-[0.875rem] mt-[2px]">
                  Discover fundraisers to support
                </p>
              </div>
              <MdOutlineChevronRight size={20} />
            </div>

            {/* Fundraise */}
            <div className="flex items-center justify-between cursor-pointer p-[1rem_0.5rem] rounded-[12px] duration-500 hover:bg-[#2525250d]">
              <div className="flex flex-col">
                <h2 className="text-xl font-normal">Fundraise</h2>
                <p className="text-[#6f6f6f] text-[0.875rem] mt-[2px]">
                  Start fundraising, tips, and resources
                </p>
              </div>
              <MdOutlineChevronRight size={20} />
            </div>

            {/* About */}
            <div className="flex items-center justify-between cursor-pointer p-[1rem_0.5rem] rounded-[12px] duration-500 hover:bg-[#2525250d]">
              <div className="flex flex-col">
                <h2 className="text-xl font-normal">About</h2>
                <p className="text-[#6f6f6f] text-[0.875rem] mt-[2px]">
                  How it works, pricing, and more
                </p>
              </div>
              <MdOutlineChevronRight size={20} />
            </div>

            {/* Help Center */}
            <div className="flex items-center justify-between cursor-pointer p-[1rem_0.5rem] rounded-[12px] duration-500 hover:bg-[#2525250d]">
              <div className="flex flex-col">
                <h2 className="text-xl font-normal">Help Center</h2>
                <p className="text-[#6f6f6f] text-[0.875rem] mt-[2px]">
                  Technical support and help
                </p>
              </div>
              <MdOutlineChevronRight size={20} />
            </div>

            {/* If not logged in, show sign up + sign in buttons */}
            {!user && (
              <div className="flex flex-col items-center space-y-4 mt-8">
                <button
                  onClick={() => navigate(paths.REGISTER)}
                  className="w-full xs:w-[375px] transition-all delay-200 text-white bg-primary-foreground border-primary-foreground py-3 rounded-xl hover:bg-[#a31818]"
                >
                  Start a GoFundMe
                </button>
                <button
                  onClick={() => navigate(paths.LOGIN)}
                  className="w-full xs:w-[375px] transition-all delay-200 text-black border-[1px] border-black hover:bg-[#2525250d] hover:border-[#6f6f6f] py-3 rounded-xl"
                >
                  Sign in
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
