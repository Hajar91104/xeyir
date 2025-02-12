import { DataTable } from "@/components/shared/DataTable";
import CampaignImage from "@/assets/images/campaign.jpg";
import { campaignColumns } from "./components/CampaignColumns";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { paths } from "@/constants/paths";

const CampaignPage = () => {
  const navigate = useNavigate();
  const items = [
    {
      id: "1232",
      image: CampaignImage,
      title: "Rebuilding a home - Maureen Folan (McDonagh)",
      description:
        "Hi, my name is Gerard, and I am representing a huge community of people that want to support our friend Maureen Folan—a truly remarkable woman whose life was turned upside down by the devastation of Storm Éowyn. Maureen, a widow who lives alone, is known and loved throughout her community for her warmth, generosity, and unshakable kindness. Many of us, myself included, have been blessed by Maureen’s hospitality—whether it was a cup of tea, a big fry after a big night out, her fabulous baking, a kind word, or a helping hand. She goes above and beyond for everyone, no matter how well she knows them. Her family home, which has been in her family for generations, was tragically destroyed during the storm. The roof was completely blown off, her belongings were scattered across fields, and the house suffered severe structural damage. It’s hard to overstate the heartbreak of seeing such a cherished place, so full of memories, reduced to rubble.",
      goalAmount: 100000,
      currency: "USD",
      date: Date.now(),
    },
  ];
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-2xl py-6">Your Campaigns</h1>
        <Button onClick={() => navigate(paths.PROFILE.GOFUNDME.CREATE)}>
          Create +
        </Button>
      </div>
      <DataTable columns={campaignColumns} data={items} />
    </div>
  );
};

export default CampaignPage;
