import { TbHomeHeart } from "react-icons/tb";
import { PiHandHeartLight } from "react-icons/pi";
import { MdOutlineCampaign } from "react-icons/md";
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

const items = [
  {
    title: "Profile",
    url: paths.PROFILE.MAIN,
    icon: <TbHomeHeart size={20} />,
  },
  {
    title: "Contributions",
    url: paths.PROFILE.CONTRIBUTIONS,
    icon: <PiHandHeartLight size={20} />,
  },
  {
    title: "My Campaigns",
    url: paths.PROFILE.GOFUNDME.LIST,
    icon: <MdOutlineCampaign size={20} />,
  },
  // {
  //   title: "Chat",
  //   url: paths.PROFILE.CHAT.VIEW,
  //   icon: MessageCircleIcon,
  // },
];

export const ProfileSidebar = () => {
  return (
    <Sidebar className=" sticky ">
      <SidebarContent className="p-3">
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-full flex items-center justify-center w-16 h-16">
                <img
                  src={Avatar}
                  alt="avatar"
                  className="rounded-full object-cover w-16 h-16"
                />
              </div>
              <div>
                <h1 className="font-semibold text-base">Hajar Mammadova</h1>
                <p className="text-xs text-secondary">Joined 10.02.2025</p>
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
