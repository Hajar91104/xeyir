import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Frame from "@/assets/icons/frame.svg";
import YourCause from "@/assets/images/hero-your-cause-1.png";
import Medical from "@/assets/images/hero-medical-1.png";
import Emergency from "@/assets/images/hero-emergency-1.png";
import Education from "@/assets/images/hero-education-1.png";
import Animal from "@/assets/images/hero-animals-1.png";
import Business from "@/assets/images/hero-business-1.png";

const categories = [
  { id: 1, name: "Your Cause", image: YourCause },
  { id: 2, name: "Medical", image: Medical },
  { id: 3, name: "Emergency", image: Emergency },
  { id: 4, name: "Education", image: Education },
  { id: 5, name: "Animal", image: Animal },
  { id: 6, name: "Business", image: Business },
];

const LandingSection = () => {
  const [rotation, setRotation] = useState(0);

  const handleRotate = (direction: number) => {
    setRotation((prev) => prev + direction * (360 / categories.length));
  };

  return (
    <div className="flex justify-center items-center min-h-screen relative">
      <div className="flex gap-32">
        <div className="flex flex-col gap-8 ">
          <div className="relative translate-x-20">
            <img
              src={Frame}
              alt="frame"
              className="h-[11.25rem] w-[11.25rem]"
            />
            <img
              src={YourCause}
              alt="yourcause"
              className="absolute top-[.8125rem] left-[.8125rem] h-[9.625rem] w-[9.625rem] transition-all duration-300 cursor-pointer hover:scale-105"
            />
            <span className="absolute text-nowrap bottom-[20%] right-[10%] bg-[#e5e1d7] text-[#505050] text-[.875rem] font-bold px-[0.5rem] rounded-full">
              Your Cause
            </span>
          </div>
          <div className="relative -translate-x-32">
            <img
              src={Frame}
              alt="frame"
              className="h-[11.25rem] w-[11.25rem]"
            />
            <img
              src={Medical}
              alt="medical"
              className="absolute top-[.8125rem] left-[.8125rem] h-[9.625rem] w-[9.625rem] transition-all duration-300 cursor-pointer hover:scale-105"
            />
            <span className="absolute bottom-[20%] right-[10%] bg-[#e5e1d7] text-[#505050] text-[.875rem] font-bold px-[0.5rem] rounded-full">
              Medical
            </span>
          </div>
          <div className="relative translate-x-20">
            <img
              src={Frame}
              alt="frame"
              className="h-[11.25rem] w-[11.25rem]"
            />
            <img
              src={Emergency}
              alt="emergency"
              className="absolute top-[.8125rem] left-[.8125rem] h-[9.625rem] w-[9.625rem] transition-all duration-300 cursor-pointer hover:scale-105"
            />
            <span className="absolute bottom-[20%] right-[10%] bg-[#e5e1d7] text-[#505050] text-[.875rem] font-bold px-[0.5rem] rounded-full">
              Emergency
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <p className="text-sm text-gray-500 mb-2">#1 crowdfunding platform</p>
          <h1 className="text-5xl font-bold mb-8 text-center">
            Successful
            <br />
            fundraisers
            <br />
            start here
          </h1>
          <button className="px-6 py-3 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700">
            Start a GoFundMe
          </button>
        </div>

        <div className="flex flex-col gap-8 ">
          <div className="relative translate-x-[-20px]">
            <img
              src={Frame}
              alt="frame"
              className="h-[11.25rem] w-[11.25rem]"
            />
            <img
              src={Education}
              alt="education"
              className="absolute top-[.8125rem] left-[.8125rem] h-[9.625rem] w-[9.625rem] transition-all duration-300 cursor-pointer hover:scale-105"
            />
            <span className="absolute bottom-[20%] right-[10%] bg-[#e5e1d7] text-[#505050] text-[.875rem] font-bold px-[0.5rem] rounded-full">
              Education
            </span>
          </div>
          <div className="relative translate-x-40">
            <img
              src={Frame}
              alt="frame"
              className="h-[11.25rem] w-[11.25rem]"
            />
            <img
              src={Animal}
              alt="animal"
              className="absolute top-[.8125rem] left-[.8125rem] h-[9.625rem] w-[9.625rem] transition-all duration-300 cursor-pointer hover:scale-105"
            />
            <span className="absolute bottom-[20%] right-[10%] bg-[#e5e1d7] text-[#505050] text-[.875rem] font-bold px-[0.5rem] rounded-full">
              Animal
            </span>
          </div>
          <div className="relative translate-x-[-20px]">
            <img
              src={Frame}
              alt="frame"
              className="h-[11.25rem] w-[11.25rem]"
            />
            <img
              src={Business}
              alt="business"
              className="absolute top-[.8125rem] left-[.8125rem] h-[9.625rem] w-[9.625rem] transition-all duration-300 cursor-pointer hover:scale-105"
            />
            <span className="absolute bottom-[20%] right-[10%] bg-[#e5e1d7] text-[#505050] text-[.875rem] font-bold px-[0.5rem] rounded-full">
              Business
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingSection;
