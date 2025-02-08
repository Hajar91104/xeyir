import DonationCard from "@/components/shared/DonationCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRef, useState } from "react";

import "swiper/css";

interface Fundraiser {
  image: string;
  title: string;
  donations: string;
  currency: string;
  //   author: string;
  amountRaised: number;
  goalAmount: number;
}
const RecommendationSection = () => {
  const fundraisers: Fundraiser[] = [
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

  const sliderRef = useRef<SwiperRef>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.swiper.slideNext();
    }
  };

  return (
    <div className="bg-[#002c1c] py-16">
      <div className="container">
        <div className="mb-12">
          <h2 className="text-[28px] lg:text-[32px] font-semibold text-white mb-4">
            More ways to make a difference. Find fundraisers inspired by what
            you care about.
          </h2>
          <div className="flex items-center justify-between">
            <button className="hidden lg:flex items-center gap-2 text-white border border-white/20 rounded-full px-4 py-2">
              <span>Happening Worldwide</span>
            </button>
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                disabled={isBeginning}
                className={`p-2 rounded-full border border-white/20 text-white transition-colors ${
                  isBeginning
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-white/10"
                }`}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                disabled={isEnd}
                className={`p-2 rounded-full border border-white/20 text-white transition-colors ${
                  isEnd ? "opacity-50 cursor-not-allowed" : "hover:bg-white/10"
                }`}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        <Swiper
          ref={sliderRef}
          modules={[Navigation]}
          spaceBetween={24}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            990: {
              slidesPerView: 4,
            },
          }}
          className="w-full"
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
        >
          {fundraisers.map((fundraiser, index) => (
            <SwiperSlide key={index}>
              <DonationCard
                fundraiser={fundraiser}
                className="text-white bg-transparent border-none hover:bg-[#0003]"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default RecommendationSection;
