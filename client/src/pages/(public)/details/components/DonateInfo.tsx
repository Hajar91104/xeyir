import { useState } from "react";
import { PiHandHeartLight } from "react-icons/pi";
interface Donation {
  name: string;
  amount: string;
  type: "recent" | "top" | "first";
  donationType: string;
}

const DonateInfo = () => {
  const [donations] = useState<Donation[]>([
    {
      name: "Tiffany Chisholm",
      amount: "$25",
      type: "recent",
      donationType: "Recent donation",
    },
    {
      name: "DPF Drunk Phils Fans",
      amount: "$1,000",
      type: "top",
      donationType: "Top donation",
    },
    {
      name: "Destinie Brannan",
      amount: "$30",
      type: "first",
      donationType: "First donation",
    },
  ]);
  return (
    <div className="lg:sticky lg:top-[80px] lg:w-[367px]">
      <div className="bg-white rounded-xl p-6 shadow-[0_0.3125rem_1rem_-0.1875rem_#0003]">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">$120,550 raised</h2>

          <div className="w-full bg-[#e5e1d7] rounded-full h-2 mb-2">
            <div
              className="bg-[#02a95c] h-full rounded-full"
              style={{
                width: `${Math.min((120550 / 80000) * 100, 100)}%`,
              }}
            />
          </div>
          <div className="flex items-center gap-1 text-sm text-[#6b6966]">
            <span>$80K goal</span>
            <span>·</span>
            <span>3.1K donations</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <button className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[#ff8080] to-[#ff6666] hover:bg-gradient-to-r hover:from-[#ff9999] hover:to-[#ff8080] transition-all duration-300 font-semibold ">
            Share
          </button>
          <button className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[#de403b] to-[#cc0000] hover:bg-gradient-to-r hover:from-[#ff1a1a] hover:to-[#e60000] transition-all duration-300 font-semibold ">
            Donate now
          </button>
        </div>

        <div className="mt-6">
          <div className="space-y-4">
            {donations.map((donation, index) => (
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

          {/* <div className="flex gap-3 mt-4">
                  <button className="flex-1 py-2 px-4 rounded-full border border-[#e5e1d7] hover:bg-[#f7f7f7] transition-colors text-sm">
                    See all
                  </button>
                  <button className="flex-1 py-2 px-4 rounded-full border border-[#e5e1d7] hover:bg-[#f7f7f7] transition-colors text-sm">
                    See top
                  </button>
                </div> */}
        </div>
      </div>
    </div>
  );
};

export default DonateInfo;
