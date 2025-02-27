import { TbHeartHandshake } from "react-icons/tb";

interface FundraiseDropdownProps {
  hoveredItem: string | null;
}

const FundraiseDropdown: React.FC<FundraiseDropdownProps> = ({
  hoveredItem,
}) => {
  if (hoveredItem !== "Fundraise") return null;

  return (
    <div className="absolute top-full z-50 left-0 mt-2 bg-white rounded-xl shadow-lg min-w-[39.5rem] p-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-[#e5e1d7] p-2 rounded-full">
          <TbHeartHandshake size={24} />
        </div>
        <h2 className="text-xl">Start fundraising, tips, and resources</h2>
      </div>

      <div className="grid grid-cols-2">
        <div className="max-w-[18.5rem] cursor-pointer p-[1rem_0.5rem] rounded-[12px] duration-500 hover:bg-[#2525250d]">
          <h3 className="font-normal mb-1">How to start a GoFundMe</h3>
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
          <p className="text-[#6f6f6f] text-sm">Fundraise for a charity</p>
        </div>
        <div className="max-w-[18.5rem] cursor-pointer p-[1rem_0.5rem] rounded-[12px] duration-500 hover:bg-[#2525250d]">
          <h3 className="font-normal mb-1">Fundraising Blog</h3>
          <p className="text-[#6f6f6f] text-sm">Resources, tips, and more</p>
        </div>
        <div className="max-w-[18.5rem] cursor-pointer p-[1rem_0.5rem] rounded-[12px] duration-500 hover:bg-[#2525250d]">
          <h3 className="font-normal mb-1">Sign up as a charity</h3>
          <p className="text-[#6f6f6f] text-sm">Claim your charity</p>
        </div>
      </div>
    </div>
  );
};

export default FundraiseDropdown;
