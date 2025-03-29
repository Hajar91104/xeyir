import { useAppDispatch } from "@/hooks/redux";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { getCurrentUserAsync } from "@/store/features/userSlice";
import Navbar from "./navbar/Navbar";
import { HelpPopover } from "./help-popover";

const RootLayout = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCurrentUserAsync());
  }, []);
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
      <HelpPopover />
    </div>
  );
};

export default RootLayout;
