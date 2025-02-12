import { Outlet, useNavigate } from "react-router-dom";
import { SidebarProvider } from "../ui/sidebar";

import { ProfileSidebar } from "./ProfileSidebar";
import { paths } from "@/constants/paths";

export const ProfileLayout = () => {
  const navigate = useNavigate();
  //   const { user, loading } = useAppSelector(selectUserData);

  //   if (loading || user === null) {
  //     return <div>Loading ...</div>;
  //   }

  //   if (!user || user.role !== UserRole.Admin) {
  //     return <Navigate to={paths.HOME} />;
  //   }

  return (
    <>
      <div className="bg-white py-4 w-full flex justify-center items-center shadow-md z-50">
        <h1
          onClick={() => navigate(paths.HOME)}
          className="cursor-pointer font-black text-primary-foreground text-2xl"
        >
          XEYIR
        </h1>
      </div>
      <SidebarProvider>
        <ProfileSidebar />
        <main className="w-full px-6 relative pt-4">
          {/* <SidebarTrigger className=" absolute left-8 top-6" /> */}
          <div className="p-6 rounded-[10px] bg-white w-full">
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </>
  );
};
