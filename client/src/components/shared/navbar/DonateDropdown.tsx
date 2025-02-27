import { PiHandHeartThin } from "react-icons/pi";

interface DonateDropdownProps {
  hoveredItem: string | null;
}

const DonateDropdown: React.FC<DonateDropdownProps> = ({ hoveredItem }) => {
  if (hoveredItem !== "Donate") return null;

  return (
    <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg min-w-[39.5rem] p-4 z-50">
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
          <p className="text-[#6f6f6f] text-sm">Donate to verified relief</p>
        </div>
        <div className="max-w-[18.5rem] cursor-pointer p-[1rem_0.5rem] rounded-[12px] duration-500 hover:bg-[#2525250d]">
          <h3 className="font-normal mb-1">Supporter Space</h3>
          <p className="text-[#6f6f6f] text-sm">
            Inspiration, FAQs, and where to give
          </p>
        </div>
      </div>
    </div>
  );
};

export default DonateDropdown;
