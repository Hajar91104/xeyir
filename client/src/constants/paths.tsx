export const paths = {
  HOME: "/",
  BROWSE: "/browse",
  DETAIL: (id = ":id") => `/detail/${id}`,
  CHECKOUT: (id = ":id") => `/checkout/${id}`,
  LOGIN: "/login",
  REGISTER: "/registration",
  PROFILE: {
    MAIN: "/profile",
    CONTRIBUTIONS: "/profile/contributions",
    GOFUNDME: {
      LIST: "/profile/gofundme",
      CREATE: "/profile/gofundme/create",
      EDIT: (id = ":id") => `/profile/gofundme/edit/${id}`,
    },
    // ORGANISATION: {
    //   LIST: "/profile/organisation",
    //   CREATE: "/profile/organisation/create",
    //   EDIT: (id = ":id") => `/profile/organisation/edit/${id}`,
    // },
  },
  DASHBOARD: {
    MAIN: "/dashboard",
    GOFUNDME: {
      LIST: "/dashboard/gofundme",
      EDIT: (id = ":id") => `/dashboard/gofundme/edit/${id}`,
    },
    NONPROFIT: {
      LIST: "/dashboard/nonprofit",
      CREATE: "/dashboard/nonprofit/create",
      EDIT: (id = ":id") => `/dashboard/nonprofit/edit/${id}`,
    },
    REVIEWS: {
      LIST: "/dashboard/reviews",
    },
    CHAT: {
      VIEW: "/dashboard/chat",
      USER: (id = ":id") => `/dashboard/chat/${id}`,
    },
  },
};
