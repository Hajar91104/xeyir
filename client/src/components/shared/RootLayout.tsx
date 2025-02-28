import { useAppDispatch } from "@/hooks/redux";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { getCurrentUserAsync } from "@/store/features/userSlice";
import Navbar from "./navbar/Navbar";

const RootLayout = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const isDashboardPage = location.pathname.includes("dashboard");

  useEffect(() => {
    dispatch(getCurrentUserAsync());
  }, []);
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;
