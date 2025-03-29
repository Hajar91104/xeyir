import { AuthLayout } from "@/components/shared/AuthLayout";
import { DashboardLayout } from "@/components/shared/DashboardLayout";
import { ProfileLayout } from "@/components/shared/ProfileLayout";
import RootLayout from "@/components/shared/RootLayout";
import { paths } from "@/constants/paths";
import DashboardMain from "@/pages/(dashboard)";
import CampaignDashboardPage from "@/pages/(dashboard)/Campaign";
import { ChatPage } from "@/pages/(dashboard)/chat";
import DashboardNonprofitCreatePage from "@/pages/(dashboard)/create";
import DashboardNonprofitEditPage from "@/pages/(dashboard)/edit";
import NonprofitDashboardPage from "@/pages/(dashboard)/Nonprofit";
import ReviewsDashboardPage from "@/pages/(dashboard)/Reviews";
import CheckoutPage from "@/pages/(public)/checkout";
import DetailsPage from "@/pages/(public)/details";
import HomePage from "@/pages/(public)/home";
import BrowsePage from "@/pages/(public)/list";
import ProfilePage from "@/pages/(public)/profile";
import CampaignPage from "@/pages/(public)/profile/Campaign";
import ContributionsPage from "@/pages/(public)/profile/Contributions";
import CreatePage from "@/pages/(public)/profile/create";
import EditPage from "@/pages/(public)/profile/edit";
import LoginPage from "@/pages/auth/Login";
import RegistrationPage from "@/pages/auth/Registration";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      {
        path: paths.HOME,
        element: <HomePage />,
      },
      {
        path: paths.BROWSE,
        element: <BrowsePage />,
      },
      {
        path: paths.DETAIL(),
        element: <DetailsPage />,
      },

      {
        path: "",
        element: <AuthLayout />,
        children: [
          {
            path: paths.CHECKOUT(),
            element: <CheckoutPage />,
          },
        ],
      },
    ], // отсюда удалишь
  },
  {
    path: paths.LOGIN,
    element: <LoginPage />,
  },
  {
    path: paths.REGISTER,
    element: <RegistrationPage />,
  },
  {
    path: "",
    element: <ProfileLayout />,
    children: [
      {
        path: paths.PROFILE.MAIN,
        element: <ProfilePage />,
      },
      {
        path: paths.PROFILE.CONTRIBUTIONS,
        element: <ContributionsPage />,
      },
      {
        path: paths.PROFILE.GOFUNDME.LIST,
        element: <CampaignPage />,
      },
      {
        path: paths.PROFILE.GOFUNDME.CREATE,
        element: <CreatePage />,
      },
      {
        path: paths.PROFILE.GOFUNDME.EDIT(),
        element: <EditPage />,
      },
    ],
  },
  {
    path: "",
    element: <DashboardLayout />,
    children: [
      {
        path: paths.DASHBOARD.MAIN,
        element: <DashboardMain />,
      },
      {
        path: paths.DASHBOARD.GOFUNDME.LIST,
        element: <CampaignDashboardPage />,
      },
      {
        path: paths.DASHBOARD.REVIEWS.LIST,
        element: <ReviewsDashboardPage />,
      },
      {
        path: paths.DASHBOARD.NONPROFIT.LIST,
        element: <NonprofitDashboardPage />,
      },
      {
        path: paths.DASHBOARD.NONPROFIT.CREATE,
        element: <DashboardNonprofitCreatePage />,
      },
      {
        path: paths.DASHBOARD.NONPROFIT.EDIT(),
        element: <DashboardNonprofitEditPage />,
      },
      {
        path: paths.DASHBOARD.CHAT.VIEW,
        element: <ChatPage />,
      },
      {
        path: paths.DASHBOARD.CHAT.USER(),
        element: <ChatPage />,
      },
    ],
  },
  //       {
  //         path: paths.LIST,
  //         element: <RentListPage />,
  //       },
  //       {
  //         path: "",
  //         element: <AuthLayout />,
  //         children: [
  //           {
  //             path: paths.PAYMENT(),
  //             element: <PaymentPage />,
  //           },
  //           {
  //             path: paths.RESERVATIONS,
  //             element: <ReservationsPage />,
  //           },
  //         ],
  //       },
  //       {
  //         path: "",
  //         element: <DashboardLayout />,
  //         children: [
  //           {
  //             path: paths.DASHBOARD.MAIN,
  //             element: <DashboardMainPage />,
  //           },
  //           {
  //             path: paths.DASHBOARD.RENTS.LIST,
  //             element: <DashboardRentListPage />,
  //           },
  //           {
  //             path: paths.DASHBOARD.RENTS.CREATE,
  //             element: <DashboardRentCreatePage />,
  //           },
  //           {
  //             path: paths.DASHBOARD.RENTS.EDIT(),
  //             element: <EditPage />,
  //           },
  //           {
  //             path: paths.DASHBOARD.RESERVATIONS.LIST,
  //             element: <DashboardReservationsListPage />,
  //           },
  //           {
  //             path: paths.DASHBOARD.REVIEWS.LIST,
  //             element: <DashboardReviewsListPage />,
  //           },
  //           {
  //             path: paths.DASHBOARD.CHAT.VIEW,
  //             element: <ChatPage />,
  //           },
  //           {
  //             path: paths.DASHBOARD.CHAT.USER(),
  //             element: <ChatPage />,
  //           },
  //         ],
  //       },
  //     ],
  //   },
]);
