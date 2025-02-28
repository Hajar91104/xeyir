import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { DashboardSidebar } from "./DashboardSidebar";
import { UserRole } from "@/types";
import { paths } from "@/constants/paths";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  getCurrentUserAsync,
  selectUserData,
} from "@/store/features/userSlice";
import { useEffect } from "react";

export const DashboardLayout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector(selectUserData);

  useEffect(() => {
    dispatch(getCurrentUserAsync());
  }, [dispatch]);

  if (loading) {
    return <div>Loading ...</div>;
  }

  if (!user || user.role !== UserRole.Admin) {
    return <Navigate to={paths.HOME} />;
  }

  return (
    <div>
      <div className="bg-white py-4 w-full flex justify-center items-center shadow-md z-50">
        <h1
          onClick={() => navigate(paths.HOME)}
          className="cursor-pointer font-black text-primary-foreground text-2xl"
        >
          XEYIR
        </h1>
      </div>
      <SidebarProvider>
        <DashboardSidebar />
        <main className="w-full px-6 relative pt-4">
          <SidebarTrigger className=" lg:hidden absolute left-8 top-6" />
          <div className="p-6 rounded-[10px] bg-white w-full">
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
};
