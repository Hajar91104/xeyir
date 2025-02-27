import { BsInfoSquare } from "react-icons/bs";

interface AboutDropdownProps {
  hoveredItem: string | null;
}

const AboutDropdown: React.FC<AboutDropdownProps> = ({ hoveredItem }) => {
  if (hoveredItem !== "About") return null;

  return (
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
          <h3 className="font-normal mb-1">About GoFundMe and Classy</h3>
        </div>
        <div className="max-w-[18.5rem] cursor-pointer p-[1rem_0.5rem] rounded-[12px] duration-500 hover:bg-[#2525250d]">
          <h3 className="font-normal mb-1">GoFundMe Giving Guarantee</h3>
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
  );
};

export default AboutDropdown;
