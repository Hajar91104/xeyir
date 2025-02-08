import DetailImage from "@/assets/images/andrew_detail.png";
import OrganizerImage from "@/assets/images/author.jpg";
import { BsShieldCheck } from "react-icons/bs";
import Comments from "./Comments";
import DonateInfo from "./DonateInfo";

const DetailCard = () => {
  return (
    <div className="container">
      <h1 className="text-[30px] lg:text-[38px] font-semibold tracking-[-0.8px] text-[#2b2b2b] mb-6">
        Help 10 year old Andre Howard Recover After Plane Crash
      </h1>
      <div className="flex w-full flex-col lg:flex-row gap-6">
        <div className="w-full">
          <div className="rounded-xl overflow-hidden mb-4">
            <img
              src={DetailImage}
              alt="Andre Howard"
              className="w-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-3 lg:gap-0 lg:flex-row items-center justify-between  mb-4">
            <div className="flex items-center gap-4">
              <img
                src={OrganizerImage}
                alt="LaShawn Hamiel"
                className="w-10 h-10 object-cover rounded-full"
              />
              <p className="text-[#2b2b2b]">
                LaShawn Hamiel is organizing this fundraiser.
              </p>
            </div>
            <button className="py-1 px-6 w-[80%] lg:w-fit border border-[#c0bdb8] hover:border-secondary hover:bg-[#2525250d] transition-all duration-300 rounded-xl text-base font-medium">
              Contact
            </button>
          </div>

          <div className="lg:hidden block lg:w-[367px]">
            <DonateInfo />
          </div>

          <div className="flex items-center py-4 border-y border-grey ">
            <div className="bg-[#cef3bd] border border-[#008748] rounded-full px-2 py-1 flex items-center gap-1">
              <BsShieldCheck size={16} color="#015d32" />
              <span className="text-[#015d32] text-sm font-bold">
                Donation protected
              </span>
            </div>
          </div>

          <div className="text-[#2b2b2b] pt-[24px] pb-[32px]">
            <p>My name is Lashawn Hamiel, I am Andre's mother.</p>
            <p>
              On Friday, January 31, 2025 around 6pm tragedy struck in
              Philadelphia when a plane crashed and caused debris to fall. While
              trying to protect his 4yrs old sister, a piece of debris went
              through the car's windshield, piercing 10-year-old Andre Howard
              III in his head causing serious injuries. Now, Andre faces a long
              and difficult road to recovery.
            </p>
            <p>
              Andre's family is overwhelmed with the emotional and financial
              burden of this unexpected tragedy. The medical expenses are
              mounting, and they need our support to ensure Andre receives the
              best possible care during his recovery journey.
            </p>
          </div>

          <div className="pt-12 pb-10 border-y border-grey flex flex-col ">
            <h1 className="text-2xl font-semibold mb-8 ">Updates (1)</h1>
            <p className="text-base font-bold mb-2">
              Today{" "}
              <span className="text-sm font-normal ml-2 text-secondary">
                by LaShawn Hamiel, Organizer
              </span>
            </p>
            <p className="text-left">
              I love (ALL) of you Truly!!!! <br /> My Son Andre "Tre" The world
              biggest SUPERHERO is Definitely loved; Blessed by you all. ♥️{" "}
              <br /> With everyone prayers and words of encouragement, this will
              make the Road to Recovery ❤️‍ that much easier. Each Donation
              given is Deeply appreciated. We wouldn't have been this strong
              without the support and help of you all. <br /> Thank you!!!
            </p>
          </div>

          <div className="pt-12 pb-10 flex flex-col ">
            <h1 className="text-2xl font-semibold mb-6 ">
              Words of Support (11)
            </h1>
            <p className="text-base font-normal text-secondary mb-8">
              Please donate to share words of support.
            </p>
            <Comments />
          </div>

          <div className="py-4 border-y bprder-grey ">
            <p className="text-base text-secondary-foreground">
              Created 4 d ago •{" "}
              <span className="cursor-pointer underline">Emergencies</span>
            </p>
          </div>
        </div>

        <div className="hidden lg:block lg:w-[367px]">
          <DonateInfo />
        </div>
      </div>
    </div>
  );
};

export default DetailCard;
