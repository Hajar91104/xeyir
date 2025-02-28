import OrganizerImage from "@/assets/images/author.jpg";
import { BsShieldCheck } from "react-icons/bs";
import Comments from "./Comments";
import DonateInfo from "./DonateInfo";
import { Campaign } from "@/types";
import { formatDistanceToNow } from "date-fns";

type Props = {
  campaign: Campaign;
};

const DetailCard = ({ campaign }: Props) => {
  return (
    <div className="container">
      <h1 className="text-[30px] lg:text-[38px] font-semibold tracking-[-0.8px] text-[#2b2b2b] mb-6">
        {campaign.title}
      </h1>
      <div className="flex w-full flex-col lg:flex-row gap-6">
        <div className="w-full">
          <div className="rounded-xl overflow-hidden mb-4">
            <img
              src={campaign.images[0]}
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
                {campaign.author.name} {campaign.author.surname} is organizing
                this fundraiser.
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
            <p>{campaign.description}</p>
          </div>

          {/* <div className="pt-12 pb-10 border-y border-grey flex flex-col ">
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
          </div> */}

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
              Created{" "}
              {formatDistanceToNow(new Date(campaign.createdAt), {
                addSuffix: true,
              })}{" "}
              • <span className="cursor-pointer underline">Emergencies</span>
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
