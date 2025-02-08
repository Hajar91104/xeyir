import { Card } from "../ui/card";

interface Fundraiser {
  image: string;
  title: string;
  donations: string;
  currency: string;
  goalAmount: number;
  amountRaised: number;
}

interface DonationCardProps {
  fundraiser: Fundraiser;
  className?: string;
}

const DonationCard = ({ fundraiser, className = "" }: DonationCardProps) => {
  return (
    <Card
      className={`rounded-xl bg-transparent overflow-hidden cursor-pointer hover:shadow-sm transition-all duration-300 hover:bg-[#fbfaf8] ${className}`}
    >
      <div className="h-[160px] overflow-hidden">
        <img
          src={fundraiser.image}
          alt={fundraiser.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4">
        <h3 className={`font-bold text-xl mb-2 line-clamp-2 ${className}`}>
          {fundraiser.title}
        </h3>
        {/* <p className="text-sm text-[#6b6966] mb-4">
                  by {fundraiser.author}
                </p> */}
        <div className="w-full rounded-full overflow-hidden bg-[#e5e1d7] mb-2">
          <div
            className="h-2 bg-gradient-to-r from-[#00b65e] to-[#008044] rounded-full"
            style={{
              width: `${Math.min(
                (fundraiser.amountRaised / fundraiser.goalAmount) * 100,
                100
              )}%`,
            }}
          />
        </div>
        <p className="font-medium">
          ${fundraiser.amountRaised.toLocaleString()} raised
        </p>
      </div>
    </Card>
  );
};

export default DonationCard;
