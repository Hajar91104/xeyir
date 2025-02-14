import React from "react";

const TutorialVideoSection = () => {
  const [isInView, setIsInView] = React.useState(false);
  const sectionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const TutorialVideo = () => {
    return (
      <div className="relative w-full pt-[56.25%]">
        <iframe
          className="absolute rounded-xl top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/8EUGN4C33e8?si=Pu4SadTkiz6q6qik"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    );
  };
  return (
    <>
      <div className="container">
        <div className="flex flex-col lg:flex-row items-center justify-between mt-8 lg:mt-12 mb-6 lg:mb-10">
          <h1 className="text-[22px] mb-3 lg:mb-0 lg:text-[28px] font-semibold ">
            How GoFundMe works
          </h1>
          <button className="text-[#252525] font-bold rounded-3xl py-1 px-6 border border-[#c0bdb8] hover:bg-[#2525250d] hover:border-secondary">
            Learn More
          </button>
        </div>
        <div className="w-full">
          <TutorialVideo />
        </div>
      </div>
      <div
        ref={sectionRef}
        className={`
          bg-[#012d19] m-auto py-44 my-24
          transition-all duration-700 ease-in-out
          ${isInView ? "rounded-none w-full" : "rounded-[1.5rem] w-[90%]"}
        `}
      >
        <div className="container">
          <h1 className="text-white text-[24px] lg:text-[28px] font-semibold mb-4">
            We've got you covered.
          </h1>
          <h1 className="text-white text-[28px] lg:text-[2.5rem] leading-[3.375rem]">
            GoFundMe is a trusted leader in online fundraising. With simple
            pricing and a team of Trust & Safety experts in your corner, you can
            raise money or make a donation with peace of mind.
          </h1>
        </div>
      </div>
    </>
  );
};

export default TutorialVideoSection;
