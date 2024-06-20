export type ForumCreateParentData = {
  title: string;
  content: string;
};

export type ForumListParentData = ForumCreateParentData & {
  id: string;
  createdAt: Date;
  user: {
    username: string;
    avatar: string;
  };
};
