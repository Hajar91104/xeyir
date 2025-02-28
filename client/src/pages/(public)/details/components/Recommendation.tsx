import DonationCard from "@/components/shared/DonationCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRef, useState } from "react";

import "swiper/css";
import { Campaign } from "@/types";

type Props = {
  campaigns: Campaign[] | undefined;
};
const RecommendationSection = ({ campaigns }: Props) => {
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
          {campaigns?.map((fundraiser, index) => (
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
