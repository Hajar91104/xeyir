import { Campaign } from "@/types";
import { Card, CardContent } from "../ui/card";
import { useNavigate } from "react-router-dom";
import { paths } from "@/constants/paths";

type Props = {
  fundraisers: Campaign[];
};

const DonationGrid = ({ fundraisers }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-2 gap-4">
      {fundraisers.map((fundraiser, index) => {
        const totalRaised =
          fundraiser.donations?.reduce((acc, donation) => {
            return acc + donation.amount;
          }, 0) ?? 0;

        return (
          <Card
            onClick={() => navigate(paths.DETAIL(fundraiser._id))}
            key={index}
            className={`rounded-xl overflow-hidden cursor-pointer p-2 hover:bg-[#fbfaf8] ${
              index === 0
                ? "lg:col-span-2 lg:row-span-2 h-auto lg:h-[578px]"
                : "lg:col-span-1 lg:row-span-1 h-auto lg:h-[287px]"
            }`}
          >
            <div
              className={`bg-cover relative bg-center transition-transform duration-300 rounded-xl h-[200px] hover:scale-[102%] ${
                index === 0 ? "lg:h-[439px]" : "lg:h-[148px]"
              }`}
              style={{ backgroundImage: `url('${fundraiser.images[0]}')` }}
            >
              <div className="absolute rounded-xl bg-[#00000080] text-white text-sm left-3 bottom-3 px-2 backdrop-blur-sm">
                <p className="text-sm font-medium">
                  {fundraiser.donations.length} donations
                </p>
              </div>
            </div>
            <CardContent className="p-4 hover:bg-[#fbfaf8]">
              <h3 className="text-base font-bold mb-2 lg:h-[2.6rem]">
                {fundraiser.title}
              </h3>
              <div className="w-full rounded-full overflow-hidden mt-6">
                <progress
                  max={100}
                  value={(totalRaised / fundraiser.goalAmount) * 100}
                  className="w-full [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-[#e5e1d7] [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-gradient-to-r [&::-webkit-progress-value]:from-[#00b65e] [&::-webkit-progress-value]:to-[#008044] h-2"
                />
              </div>
              <p className="text-sm font-medium text-black mb-2">
                {fundraiser.currency}
                {totalRaised} raised
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default DonationGrid;
