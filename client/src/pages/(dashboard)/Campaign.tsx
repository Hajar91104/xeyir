import { DataTable } from "@/components/shared/DataTable";
import {
  Campaign,
  dashboardCampaignColumns,
} from "./components/DashboardCampaignColumns";
import CampaignImage from "@/assets/images/campaign.jpg";

const CampaignDashboardPage = () => {
  const data: Campaign[] = [
    {
      id: "1232",
      image: CampaignImage,
      title: "Rebuilding a home - Maureen Folan (McDonagh)",
      goalAmount: 100000,
      amountDonated: 3000,
      currency: "USD",
      date: Date.now(),
      status: "pending",
    },
  ];
  return (
    <div>
      <DataTable columns={dashboardCampaignColumns} data={data} />
    </div>
  );
};

export default CampaignDashboardPage;
