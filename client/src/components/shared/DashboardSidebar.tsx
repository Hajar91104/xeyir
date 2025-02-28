import { TbHomeHeart } from "react-icons/tb";
import { PiHandHeartLight } from "react-icons/pi";
import { MdOutlineCampaign } from "react-icons/md";
import { BsClipboardHeart } from "react-icons/bs";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { paths } from "@/constants/paths";
import Avatar from "@/assets/images/avatar.jpg";
import { BsFillChatHeartFill } from "react-icons/bs";

const items = [
  {
    title: "Main",
    url: paths.DASHBOARD.MAIN,
    icon: <TbHomeHeart size={20} />,
  },
  {
    title: "Campaigns",
    url: paths.DASHBOARD.GOFUNDME.LIST,
    icon: <PiHandHeartLight size={20} />,
  },
  {
    title: "Nonprofits",
    url: paths.DASHBOARD.NONPROFIT.LIST,
    icon: <BsClipboardHeart size={20} />,
  },
  {
    title: "Reviews",
    url: paths.DASHBOARD.REVIEWS.LIST,
    icon: <MdOutlineCampaign size={20} />,
  },
  {
    title: "Chat",
    url: paths.DASHBOARD.CHAT.VIEW,
    icon: <BsFillChatHeartFill size={20} />,
  },
];

export const DashboardSidebar = () => {
  return (
    <Sidebar className=" sticky ">
      <SidebarContent className="p-3">
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="flex items-center gap-3 mb-8">
              <div className="rounded-full flex items-center justify-center w-16 h-16">
                <img
                  src={Avatar}
                  alt="avatar"
                  className="rounded-full object-cover w-16 h-16"
                />
              </div>
              <div>
                <h1 className="font-semibold text-base">Admin</h1>
              </div>
            </div>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      {item.icon}
                      <span className="text-lg">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
