import { Card, CardContent } from "../ui/card";

interface Fundraiser {
  image: string;
  title: string;
  donations: string;
  currency: string;
  goalAmount: number;
  amountRaised: number;
}

const DonationGrid = ({ fundraisers }: { fundraisers: Fundraiser[] }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-2 gap-4">
      {fundraisers.map((fundraiser, index) => (
        <Card
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
            style={{ backgroundImage: `url(${fundraiser.image})` }}
          >
            <div className="absolute rounded-xl bg-[#00000080] text-white text-sm left-3 bottom-3 px-2 backdrop-blur-sm">
              <p className="text-sm font-medium">
                {fundraiser.donations} donations
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
                value={(fundraiser.amountRaised / fundraiser.goalAmount) * 100}
                className="w-full [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-[#e5e1d7] [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-gradient-to-r [&::-webkit-progress-value]:from-[#00b65e] [&::-webkit-progress-value]:to-[#008044] h-2"
              />
            </div>
            <p className="text-sm font-medium text-black mb-2">
              {fundraiser.currency}
              {fundraiser.amountRaised} raised
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export type { Fundraiser };
export default DonationGrid;
