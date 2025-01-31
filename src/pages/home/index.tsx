import DiscoverSection from "./components/Discover";
import FundraisingSteps from "./components/Guide";
import LandingSection from "./components/Landing";

const HomePage = () => {
  return (
    <div className="  mt-[64px] ">
      <LandingSection />
      <FundraisingSteps />
      <DiscoverSection />
      <div className="container"></div>
    </div>
  );
};

export default HomePage;
