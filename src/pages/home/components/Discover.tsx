import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Discover1 from "@/assets/images/discover1.jpg";
import Discover2 from "@/assets/images/discover2.jpg";
import Discover3 from "@/assets/images/discover3.jpg";
import Discover4 from "@/assets/images/discover4.jpg";
import Discover5 from "@/assets/images/discover5.jpg";
import Discover6 from "@/assets/images/discover6.jpeg";
import Discover7 from "@/assets/images/discover7.jpg";
import Discover8 from "@/assets/images/discover8.jpg";
import Discover9 from "@/assets/images/discover9.jpg";
import Discover10 from "@/assets/images/discover10.jpg";

const fundraisersPage1 = [
  {
    image: Discover1,
    title: "Support Jack Grivetti's Recovery",
    donations: "1.2K",
    currency: "$",
    goalAmount: 45000,
    amountRaised: 65683,
  },
  {
    image: Discover2,
    title: "UNLEASH THE FURY- For the love of Wes Johnson",
    donations: "2.9K",
    currency: "$",
    goalAmount: 200000,
    amountRaised: 170481,
  },
  {
    image: Discover3,
    title: "Support Primrose in Her Fight Against Leukaemia",
    donations: "1.1K",
    currency: "£",
    goalAmount: 3000,
    amountRaised: 26291,
  },
  {
    image: Discover4,
    title: "Rebuilding a home - Maureen Folan (McDonagh)",
    donations: "1.3K ",
    currency: "€",
    goalAmount: 100000,
    amountRaised: 59045,
  },
  {
    image: Discover5,
    title: "Justice for Mandi: Support Her Family",
    donations: "726 ",
    currency: "$",
    goalAmount: 30000,
    amountRaised: 48417,
  },
];

const fundraisersPage2 = [
  {
    image: Discover6,
    title: "Support Tyler and Family in Memory of Kelsey",
    donations: "1.6K ",
    currency: "$",
    goalAmount: 150000,
    amountRaised: 149770,
  },
  {
    image: Discover7,
    title: "Ted Spurrell and his road to recovery ❤️",
    donations: "995 ",
    currency: "£",
    goalAmount: 26000,
    amountRaised: 20640,
  },
  {
    image: Discover8,
    title: "Viveca Hawkins' Stroke Recovery",
    donations: "784",
    currency: "$",
    goalAmount: 100000,
    amountRaised: 69207,
  },
  {
    image: Discover9,
    title: "Support Sidhu's Family After His Sudden Loss",
    donations: "2.3K",
    currency: "$",
    goalAmount: 300000,
    amountRaised: 118001,
  },
  {
    image: Discover10,
    title: "In loving memory of Chris & JuJu & support for the Vrbesic's",
    donations: "1K",
    currency: "$",
    goalAmount: 200000,
    amountRaised: 215745,
  },
];

export default function DiscoverSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const fundraisers = currentPage === 1 ? fundraisersPage1 : fundraisersPage2;

  return (
    <div className=" container">
      <h2 className="text-[22px] lg:text-[28px] font-semibold mt-8 lg:mt-12 mb-6 lg:mb-10">
        Discover fundraisers inspired by what you care about
      </h2>
      <div className="flex flex-col lg:flex-row justify-between items-center mb-6 lg:mb-8 gap-4">
        <button className="text-[#252525] font-bold rounded-3xl py-1 px-6 border border-[#c0bdb8] hover:bg-[#2525250d] hover:border-secondary">
          Happening worldwide
        </button>
        <div className="flex items-center gap-2">
          <button
            className="border disabled:border-[#e5e1d7] disabled:text-[#c0bdb8] rounded-full w-8 h-8 text-[#252525] border-[#c0bdb8] hover:bg-[#2525250d] "
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            ←
          </button>
          <button
            className="border disabled:border-[#e5e1d7] disabled:text-[#c0bdb8] rounded-full w-8 h-8 text-[#252525] border-[#c0bdb8] hover:bg-[#2525250d] "
            onClick={() => setCurrentPage(2)}
            disabled={currentPage === 2}
          >
            →
          </button>
        </div>
      </div>
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
                  value={
                    (fundraiser.amountRaised / fundraiser.goalAmount) * 100
                  }
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
    </div>
  );
}
