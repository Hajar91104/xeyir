// import { DashboardLayout } from "@/components/shared/DashboardLayout";
// import RootLayout from "@/components/shared/RootLayout";
// import { paths } from "@/constants/paths";
// import { DetailsPage } from "@/pages/(business)/details";
// import HomePage from "@/pages/(business)/home";
// import { RentListPage } from "@/pages/(business)/list";
// import { PaymentPage } from "@/pages/(business)/payment";
// import { DashboardMainPage } from "@/pages/(dashboard)/main";
// import { DashboardRentListPage } from "@/pages/(dashboard)/rents/list";
// import { DashboardRentCreatePage } from "@/pages/(dashboard)/rents/create";
// import { createBrowserRouter } from "react-router-dom";
// import EditPage from "@/pages/(dashboard)/rents/edit";
// import { AuthLayout } from "@/components/shared/AuthLoayout";
// import { ReservationsPage } from "@/pages/(business)/reservations";
// import { DashboardReservationsListPage } from "@/pages/(dashboard)/reservations/list";
// import { DashboardReviewsListPage } from "@/pages/(dashboard)/review/list";
// import { ChatPage } from "@/pages/(dashboard)/chat";

import RootLayout from "@/components/shared/RootLayout";
import { paths } from "@/constants/paths";
import HomePage from "@/pages/home";
import BrowsePage from "@/pages/list";
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
    ], // отсюда удалишь
  },
  //       {
  //         path: paths.LIST,
  //         element: <RentListPage />,
  //       },
  //       {
  //         path: paths.DETAIL(),
  //         element: <DetailsPage />,
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
