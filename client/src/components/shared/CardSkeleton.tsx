import { Card } from "../ui/card";

interface DonationCardSkeletonProps {
  className?: string;
}

const DonationCardSkeleton = ({
  className = "",
}: DonationCardSkeletonProps) => {
  return (
    <Card
      className={`rounded-xl bg-transparent overflow-hidden animate-pulse ${className}`}
    >
      <div className="h-[160px] bg-[#e5e1d7]" />

      <div className="p-4">
        <div className="h-4 bg-[#e5e1d7] rounded w-3/4 mb-2" />
        <div className="h-4 bg-[#e5e1d7] rounded w-1/2 mb-4" />
        <div className="w-full h-2 bg-[#e5e1d7] rounded" />
      </div>
    </Card>
  );
};

export default DonationCardSkeleton;
