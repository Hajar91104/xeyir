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
import Avatar from "@/assets/images/account.png";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "@/hooks/redux";
import { selectUserData } from "@/store/features/userSlice";
import { format } from "date-fns";

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
];

export const ProfileSidebar = () => {
  const location = useLocation();
  const { user } = useAppSelector(selectUserData);
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
                <h1 className="font-semibold text-base">
                  {user?.name} {user?.surname}
                </h1>
                <p className="text-xs text-secondary">
                  Joined {format(user?.createdAt!, "dd.MM.yyyy")}
                </p>
              </div>
            </div>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className={` ${
                      location.pathname === item.url ? "bg-gray-200" : ""
                    }`}
                    asChild
                  >
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
