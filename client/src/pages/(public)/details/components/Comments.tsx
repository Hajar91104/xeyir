import { QUERY_KEYS } from "@/constants/query-keys";
import campaignService from "@/services/campaign";
import { useQuery } from "@tanstack/react-query";
import { PiHandHeartLight } from "react-icons/pi";
import { useParams } from "react-router-dom";

const Comments = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.CAMPAIGN_DETAIL, id],
    queryFn: () => campaignService.getById(id!),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data</p>;

  const campaign = data?.data?.item;

  return (
    <div className="flex flex-col justify-start">
      {campaign?.comments?.map((comment) => (
        <div key={comment._id} className="flex gap-x-4 p-[16px_8px]">
          <div className="bg-[#f4f2ec] rounded-full h-10 w-10 flex items-center justify-center">
            <PiHandHeartLight className="w-6 h-6" />
          </div>
          <div className="w-full">
            <h1 className="text-base font-bold">
              {comment.author.name} {comment.author.surname}
            </h1>
            <p className="text-secondary-foreground text-sm font-normal">
              {comment.donation?.amount}$ • 11 hrs
            </p>
            <p className="text-secondary-foreground text-base">
              {comment.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
