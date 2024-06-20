export type ForumCreateParentData = {
  title: string;
  content: string;
};

export type ForumParentData = ForumCreateParentData & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    username: string;
    avatar: string;
  };
};

export type ForumChildData = {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    username: string;
    avatar: string;
  };
};
