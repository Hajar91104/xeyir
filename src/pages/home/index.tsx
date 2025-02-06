import DiscoverSection from "./components/Discover";
import FundraisingSteps from "./components/Guide";
import LandingSection from "./components/Landing";
import TutorialVideoSection from "./components/TutorialVideo";

const HomePage = () => {
  return (
    <div className="  mt-[64px] ">
      <LandingSection />
      <FundraisingSteps />
      <DiscoverSection />
      <TutorialVideoSection />
    </div>
  );
};

export default HomePage;
