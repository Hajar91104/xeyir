import DetailCard from "./components/DetailCard";
import AirplaneIcon from "@/assets/images/airplane.png";
import PhoneIcon from "@/assets/images/phone.png";
import ShieldIcon from "@/assets/images/shield.png";
import RecommendationSection from "./components/Recommendation";
const DetailsPage = () => {
  return (
    <div className=" mt-[64px] py-8 lg:py-16">
      <DetailCard />
      <div className="mt-12 py-[88px] bg-[#fbfaf8]">
        <div className="container">
          <h1 className="text-xl font-semibold mb-12">
            Your easy, powerful, and trusted home for help
          </h1>
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex items-center w-full  gap-4">
              <img
                src={AirplaneIcon}
                alt="airplane "
                className="w-12 h-12 object-scale-down"
              />
              <div>
                <h1 className="text-base font-semibold">Easy</h1>
                <p className="text-nowrap">Donate quickly and easily</p>
              </div>
            </div>

            <div className="flex items-center w-full justify-start gap-4">
              <img
                src={PhoneIcon}
                alt="phone "
                className="w-12 h-12 object-scale-down"
              />
              <div>
                <h1 className="text-base font-semibold">Powerful</h1>
                <p>Send help right to the people and causes you care about</p>
              </div>
            </div>

            <div className="flex items-center w-full justify-start gap-4">
              <img
                src={ShieldIcon}
                alt="shield "
                className="w-12 h-12 object-scale-down"
              />
              <div>
                <h1 className="text-base font-semibold">Trusted</h1>
                <p>
                  Your donation is protected by the GoFundMe Giving Guarantee
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RecommendationSection />
    </div>
  );
};

export default DetailsPage;
