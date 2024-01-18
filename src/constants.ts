export const COLORS = {
  WHITE: "#FFFFFF",
  BLUE: "#1677ff",
};

export const PADDING = "25px";
export const HEADER_HEIGHT = "64px";
export const SIDEBAR_WIDTH = {
  EXPANDED: "20%",
  COLLAPSED: "12%",
};

export const SEARCH_PLACEHOLDER = "Type here to search...";
export const LIVE_METRICS = "Live metrics";
export const ADD = "Add";
export const PAGE_SIZE = 4;

export const ROUTES = {
  HOME: "/",
  BLOGS_ALL: "/blogs/all",
  BLOGS_LATEST: "/blogs/latest",
  BLOGS_ARCHIVED: "/blogs/archived",
  DASHBOARD: "/dashboard",
  POST_ID: "/blogs/:id",
  CALENDAR: "/calendar",
  SCHEDULE: "/scheduleActions",
  LIVE_ALERTS: "/liveAlerts",
  DOCUMENTATION: "/documentation",
  REPORTS: "/reports",
  HELP: "/help",
  BLOGS: "/blogs/:type",
  POST: "blogs/:type/:id",
};

export const SIDEBAR_MENU = {
  DASHBOARD: {
    DASHBOARDS: "Dashboards",
    OVERVIEW: "Overview",
    CALENDAR: "Calendar",
    SCHEDULE_ACTIONS: "Schedule Actions",
    LIVE_ALERTS: "Live Alerts",
  },
  BLOGS: {
    BLOGS: "Blogs",
    ALL: "All",
    LATEST: "Latest",
    ARCHIVED: "Archived",
  },
  DOCUMENTATION: "DOCUMENTATION",
  REPORTS: "REPORTS",
  NEED_HELP: "NEED HELP?",
  SUB: ["sub1", "sub2", "sub3", "sub4", "sub5"],
};

export const MODAL = {
  TITLE: "Post",
  BUTTONS: {
    SAVE: "Save",
    SAVE_KEY: "save",
    CANCEL: "Cancel",
    CANCEL_KEY: "cancel",
  },
  LABELS: {
    TITLE: "Title",
    BODY: "Body",
  },
  NAMES: {
    TITLE: "title",
    BODY: "body",
  },
  FORM_MESSAGES: {
    TITLE_LENGTH: "Title should have at least 3 characters",
    TITLE_REQUIRED: "Title is required",
    BODY_MIN_LENGTH: "Body should have at least 3 characters",
    BODY_MAX_LENGTH: "Body should have up to 250 characters",
    BODY_REQUIRED: "Body is required",
  },
  FORM_PLACEHOLDER: "Type here...",
};
