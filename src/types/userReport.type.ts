export type ReportType =
  | "USER_AVATAR"
  | "USER_USERNAME"
  | "USER_BIOGRAPHY"
  | "USER_FILM_COMMENT"
  | "USER_FORUM_PARENT_TITLE"
  | "USER_FORUM_PARENT_CONTENT"
  | "USER_FORUM_CHILD_CONTENT";

export type UserReport = {
  id: string;
  reportId: string;
  reportType: ReportType;
  reportContent: string;
  user: {
    id: string;
    username: string;
  };
};
