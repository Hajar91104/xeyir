import { paths } from "@/constants/paths";
import { Campaign } from "@/types";
import { useNavigate } from "react-router-dom";
import { PiHandHeartLight } from "react-icons/pi";
import { toast } from "sonner";

type Props = {
  id: string;
  campaign: Campaign;
};

const DonateInfo = ({ id, campaign }: Props) => {
  const navigate = useNavigate();
  console.log(campaign);

  const totalRaised =
    campaign.donations?.reduce((acc, donation) => {
      return acc + donation.amount;
    }, 0) ?? 0;

  const donations = campaign.donations ?? [];

  let topDonation = null;
  let firstDonation = null;
  let recentDonation = null;

  if (donations.length > 0) {
    topDonation = donations.reduce((max, current) =>
      current.amount > max.amount ? current : max
    );

    const byDateAsc = [...donations].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
    firstDonation = byDateAsc[0];

    const byDateDesc = [...donations].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    recentDonation = byDateDesc[0];
  }

  const specialDonations = [];
  if (firstDonation) {
    specialDonations.push({
      name: firstDonation.isAnonymous
        ? "Anonymous"
        : `${firstDonation.user?.name} ${firstDonation.user?.surname}`,
      amount: `$${firstDonation.amount}`,
      donationType: "First donation",
    });
  }
  if (recentDonation) {
    specialDonations.push({
      name: recentDonation.isAnonymous
        ? "Anonymous"
        : `${recentDonation.user?.name} ${recentDonation.user?.surname}`,

      amount: `$${recentDonation.amount}`,
      donationType: "Recent donation",
    });
  }
  if (topDonation) {
    specialDonations.push({
      name: topDonation.isAnonymous
        ? "Anonymous"
        : `${topDonation.user?.name} ${topDonation.user?.surname}`,

      amount: `$${topDonation.amount}`,
      donationType: "Top donation",
    });
  }

  const handleShare = () => {
    const shareUrl = `${window.location.origin}${paths.DETAIL(id)}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied to clipbaord!");
  };

  return (
    <div className="lg:sticky lg:top-[80px] lg:w-[367px]">
      <div className="bg-white rounded-xl p-6 shadow-[0_0.3125rem_1rem_-0.1875rem_#0003]">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">${totalRaised} raised</h2>

          <div className="w-full bg-[#e5e1d7] rounded-full h-2 mb-2">
            <div
              className="bg-[#02a95c] h-full rounded-full"
              style={{
                width: `${Math.min(
                  (totalRaised / campaign.goalAmount) * 100,
                  100
                )}%`,
              }}
            />
          </div>
          <div className="flex items-center gap-1 text-sm text-[#6b6966]">
            <span>${campaign.goalAmount} goal</span>
            <span>·</span>
            <span>{donations.length} donations</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={handleShare}
            className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[#ff8080] to-[#ff6666] hover:from-[#ff9999] hover:to-[#ff8080] transition-all duration-300 font-semibold"
          >
            Share
          </button>

          <button
            onClick={() => navigate(paths.CHECKOUT(id))}
            className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[#de403b] to-[#cc0000] hover:from-[#ff1a1a] hover:to-[#e60000] transition-all duration-300 font-semibold"
          >
            Donate now
          </button>
        </div>

        <div className="mt-6">
          <div className="space-y-4">
            {specialDonations.map((donation, index) => (
              <div key={index} className="flex flex-col justify-start">
                <div className="flex gap-x-4 p-[16px_8px]">
                  <div className="bg-[#f4f2ec] rounded-full h-10 w-10 flex items-center justify-center ">
                    <PiHandHeartLight className="w-6 h-6" />
                  </div>
                  <div className="w-full">
                    <h1 className="text-base font-bold ">{donation.name}</h1>
                    <p className="text-secondary-foreground text-sm font-normal">
                      {donation.amount} •{" "}
                      <span className="underline">{donation.donationType}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonateInfo;
