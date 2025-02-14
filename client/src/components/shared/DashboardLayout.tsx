import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { DashboardSidebar } from "./DashboardSidebar";

export const DashboardLayout = () => {
  //   const { user, loading } = useAppSelector(selectUserData);

  //   if (loading || user === null) {
  //     return <div>Loading ...</div>;
  //   }

  //   if (!user || user.role !== UserRole.Admin) {
  //     return <Navigate to={paths.HOME} />;
  //   }

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="w-full px-6 relative pt-4">
        <SidebarTrigger className=" lg:hidden absolute left-8 top-6" />
        <div className="p-6 rounded-[10px] bg-white w-full">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};
