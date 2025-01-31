import { useState, useEffect } from "react";
import Step1 from "@/assets/images/step-1.png";
import Step2 from "@/assets/images/step-2.png";
import Step3 from "@/assets/images/step-3.png";
import { VscTriangleRight } from "react-icons/vsc";
import { HiMiniPause } from "react-icons/hi2";

const FundraisingSteps = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [paused, setPaused] = useState(false);

  const steps = [
    {
      number: 1,
      title: "Use our tools to create your fundraiser",
      description:
        "You'll be guided by prompts to add fundraiser details and set your goal. Make updates anytime.",
      image: Step1,
    },
    {
      number: 2,
      title: "Reach donors by sharing",
      description:
        "Share your fundraiser link and use the resources in your dashboard to gain momentum.",
      image: Step2,
    },
    {
      number: 3,
      title: "Securely receive funds",
      description:
        "Add your bank information, or invite your fundraiser beneficiary to add theirs, and start receiving funds.",
      image: Step3,
    },
  ];

  useEffect(() => {
    if (!paused) {
      const timer = setTimeout(() => {
        setCurrentStep((prevStep) =>
          prevStep === steps.length ? 1 : prevStep + 1
        );
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [currentStep, paused]);

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
    setPaused(true);
  };

  return (
    <div className="bg-[#fbfaf8]">
      <div className="container p-[6rem_1.5rem]">
        <h1 className="text-2xl lg:text-[28px] font-semibold m-auto mb-16 text-center w-full ">
          Fundraising on GoFundMe is easy,
          <br />
          powerful, and trusted
        </h1>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-12">
          <div className="bg-primary relative rounded-3xl px-10 pt-12 lg:w-[50%]">
            <img
              src={steps[currentStep - 1].image}
              alt={steps[currentStep - 1].title}
            />

            <button
              onClick={() => setPaused(!paused)}
              className="absolute top-5 right-4 p-1 rounded-full border-transparent transition-all duration-300 hover:bg-[#ffffff1a] hover:border-[1px] hover:border-[#fff] hover:rounded-full"
            >
              {paused ? (
                <VscTriangleRight color="#FFF" className="w-[2rem] h-[2rem]" />
              ) : (
                <HiMiniPause color="#FFF" className="w-[2rem] h-[2rem]" />
              )}
            </button>
          </div>
          <div className="lg:w-[50%] h-max flex flex-col gap-y-6">
            {steps.map((step) => (
              <div
                key={step.number}
                className="flex items-start cursor-pointer"
                onClick={() => handleStepClick(step.number)}
              >
                <div
                  className={`h-[32px] min-w-[32px] lg:min-w-[44px] lg:h-[44px] flex items-center justify-center mr-3 transition-all duration-300 rounded-full border font-bold text-base ${
                    currentStep === step.number
                      ? "bg-black text-white border-black"
                      : "text-black border-[#e5e1d7] hover:border-[black]"
                  }`}
                >
                  {step.number}
                </div>
                <div className="flex-1">
                  <h2 className="font-semibold text-base lg:text-xl">
                    {step.title}
                  </h2>
                  <p className="text-secondary text-xl lg:text-2xl mt-2">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundraisingSteps;
