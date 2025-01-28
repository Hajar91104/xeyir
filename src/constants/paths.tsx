export const paths = {
  HOME: "/",
  BROWSE: "/browse",
  DETAIL: (id = ":id") => `/detail/${id}`,
  CHECKOUT: (id = ":id") => `/checkout/${id}`,
  PROFILE: {
    MAIN: "/profile",
    GOFUNDME: {
      LIST: "/profile/gofundme",
      CREATE: "/profile/gofundme/create",
      EDIT: (id = ":id") => `/profile/gofundme/edit/${id}`,
    },
    ORGANISATION: {
      LIST: "/profile/organisation",
      CREATE: "/profile/organisation/create",
      EDIT: (id = ":id") => `/profile/organisation/edit/${id}`,
    },
  },
  DASHBOARD: {
    MAIN: "/dashboard",
    GOFUNDME: {
      LIST: "/dashboard/gofundme",
      EDIT: (id = ":id") => `/dashboard/gofundme/edit/${id}`,
    },
    ORGANISATION: {
      LIST: "/dashboard/organisation",
      EDIT: (id = ":id") => `/dashboard/organisation/edit/${id}`,
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
