import Frame from "@/assets/icons/frame.svg";
import YourCause from "@/assets/images/hero-your-cause-1.png";
import Medical from "@/assets/images/hero-medical-1.png";
import Emergency from "@/assets/images/hero-emergency-1.png";
import Education from "@/assets/images/hero-education-1.png";
import Animal from "@/assets/images/hero-animals-1.png";
import Business from "@/assets/images/hero-business-1.png";
import { RxLightningBolt } from "react-icons/rx";
import { TbHeartStar } from "react-icons/tb";
import { BsEnvelopeHeart } from "react-icons/bs";
// const categories = [
//   { id: 1, name: "Your Cause", image: YourCause },
//   { id: 2, name: "Medical", image: Medical },
//   { id: 3, name: "Emergency", image: Emergency },
//   { id: 4, name: "Education", image: Education },
//   { id: 5, name: "Animal", image: Animal },
//   { id: 6, name: "Business", image: Business },
// ];

const LandingSection = () => {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen relative">
        <div className="flex gap-32">
          <div className="hidden lg:flex flex-col gap-8 ">
            <div className="relative translate-x-20">
              <img
                src={Frame}
                alt="frame"
                className="h-[8.625rem] w-[8.625rem] xl:h-[11.25rem] xl:w-[11.25rem]"
              />
              <img
                src={YourCause}
                alt="yourcause"
                className="absolute top-[0.6875rem] left-[0.6875rem] xl:top-[.8125rem] xl:left-[.8125rem] h-[7.25rem] w-[7.25rem] xl:h-[9.625rem] xl:w-[9.625rem] transition-all duration-300 cursor-pointer hover:scale-105"
              />
              <span className="absolute text-nowrap bottom-[20%] right-[10%] bg-[#e5e1d7] text-[#505050] text-[.875rem] font-bold px-[0.5rem] rounded-full">
                Your Cause
              </span>
            </div>
            <div className="relative -translate-x-16 xl:-translate-x-32">
              <img
                src={Frame}
                alt="frame"
                className="h-[8.625rem] w-[8.625rem] xl:h-[11.25rem] xl:w-[11.25rem]"
              />
              <img
                src={Medical}
                alt="medical"
                className="absolute top-[0.6875rem] left-[0.6875rem] xl:top-[.8125rem] xl:left-[.8125rem] h-[7.25rem] w-[7.25rem] xl:h-[9.625rem] xl:w-[9.625rem] transition-all duration-300 cursor-pointer hover:scale-105"
              />
              <span className="absolute bottom-[20%] right-[10%] bg-[#e5e1d7] text-[#505050] text-[.875rem] font-bold px-[0.5rem] rounded-full">
                Medical
              </span>
            </div>
            <div className="relative translate-x-20">
              <img
                src={Frame}
                alt="frame"
                className="h-[8.625rem] w-[8.625rem] xl:h-[11.25rem] xl:w-[11.25rem]"
              />
              <img
                src={Emergency}
                alt="emergency"
                className="absolute top-[0.6875rem] left-[0.6875rem] xl:top-[.8125rem] xl:left-[.8125rem] h-[7.25rem] w-[7.25rem] xl:h-[9.625rem] xl:w-[9.625rem] transition-all duration-300 cursor-pointer hover:scale-105"
              />
              <span className="absolute bottom-[20%] right-[10%] bg-[#e5e1d7] text-[#505050] text-[.875rem] font-bold px-[0.5rem] rounded-full">
                Emergency
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <p className="text-lg font-semibold text-black mb-2">
              #1 crowdfunding platform
            </p>
            <h1 className="text-6xl tracking-[-.05em]  font-normal mt-6 mb-8 text-center">
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

          <div className="hidden lg:flex flex-col gap-8 ">
            <div className="relative translate-x-[-20px]">
              <img
                src={Frame}
                alt="frame"
                className="h-[8.625rem] w-[8.625rem] xl:h-[11.25rem] xl:w-[11.25rem]"
              />
              <img
                src={Education}
                alt="education"
                className="absolute top-[0.6875rem] left-[0.6875rem] xl:top-[.8125rem] xl:left-[.8125rem] h-[7.25rem] w-[7.25rem] xl:h-[9.625rem] xl:w-[9.625rem] transition-all duration-300 cursor-pointer hover:scale-105"
              />
              <span className="absolute bottom-[20%] right-[10%] bg-[#e5e1d7] text-[#505050] text-[.875rem] font-bold px-[0.5rem] rounded-full">
                Education
              </span>
            </div>
            <div className="relative translate-x-20 xl:translate-x-40">
              <img
                src={Frame}
                alt="frame"
                className="h-[8.625rem] w-[8.625rem] xl:h-[11.25rem] xl:w-[11.25rem]"
              />
              <img
                src={Animal}
                alt="animal"
                className="absolute top-[0.6875rem] left-[0.6875rem] xl:top-[.8125rem] xl:left-[.8125rem] h-[7.25rem] w-[7.25rem] xl:h-[9.625rem] xl:w-[9.625rem] transition-all duration-300 cursor-pointer hover:scale-105"
              />
              <span className="absolute bottom-[20%] right-[10%] bg-[#e5e1d7] text-[#505050] text-[.875rem] font-bold px-[0.5rem] rounded-full">
                Animal
              </span>
            </div>
            <div className="relative translate-x-[-20px]">
              <img
                src={Frame}
                alt="frame"
                className="h-[8.625rem] w-[8.625rem] xl:h-[11.25rem] xl:w-[11.25rem]"
              />
              <img
                src={Business}
                alt="business"
                className="absolute top-[0.6875rem] left-[0.6875rem] xl:top-[.8125rem] xl:left-[.8125rem] h-[7.25rem] w-[7.25rem] xl:h-[9.625rem] xl:w-[9.625rem] transition-all duration-300 cursor-pointer hover:scale-105"
              />
              <span className="absolute bottom-[20%] right-[10%] bg-[#e5e1d7] text-[#505050] text-[.875rem] font-bold px-[0.5rem] rounded-full">
                Business
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-start pt-10 items-center gap-5 lg:gap-12 container lg:pt-16 xl:pt-28">
        <h2 className="font-semibold text-2xl lg:text-4xl">
          More than $50 million is raised every week on GoFundMe.*
        </h2>
        <h2 className="text-secondary text-xl lg:text-2xl font-normal">
          Get started in just a few minutes — with helpful new tools, it's
          easier than ever to pick the perfect title, write a compelling story,
          and share it with the world.
        </h2>
      </div>
      <div className="bg-[#f9f4cb] mt-12 p-[2.25rem_0]">
        <div className="container flex items-center justify-center">
          <div className="hidden lg:flex  items-center gap-2">
            <RxLightningBolt color="#684b12" size={24} />
            <p className="text-base text-[#684b12]">
              No fee to start fundraising
            </p>
          </div>
          <p className="hidden lg:block text-[3px] text-[#684b12] mx-5">
            ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■
          </p>
          <div className="hidden lg:flex  items-center gap-2">
            <TbHeartStar color="#684b12" size={24} />
            <p className="text-base text-[#684b12]">
              <span className="font-bold">1</span> donation made every second
            </p>
          </div>
          <p className="lg:block hidden text-[3px] text-[#684b12] mx-5">
            ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■
          </p>
          <div className="flex  items-center gap-2">
            <BsEnvelopeHeart color="#684b12" size={24} />
            <p className="text-base text-[#684b12]">
              <span className="font-bold">8K+</span> fundraisers started daily
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingSection;
