import { PiHandHeartLight } from "react-icons/pi";

const Comments = () => {
  return (
    <div className="flex flex-col justify-start">
      <div className="flex gap-x-4 p-[16px_8px]">
        <div className="bg-[#f4f2ec] rounded-full h-10 w-10 flex items-center justify-center ">
          <PiHandHeartLight className="w-6 h-6" />
        </div>
        <div className="w-full">
          <h1 className="text-base font-bold ">Jacqueline Strong</h1>
          <p className="text-secondary-foreground text-sm font-normal">
            20$ • 11 hrs
          </p>
          <p className="text-secondary-foreground text-base">
            Your son is a true hero, I wish him a speedy recovery and that he be
            blessed by the most high for the rest of his life! ❤️
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comments;
