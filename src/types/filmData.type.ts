export type FilmData = {
  id: string;
  title: string;
  synopsis: string;
  genre: string[];
  poster: string;
  trailer: string;
  rating: number;
  totalReviews: number;
};

export type FilmCommentValue = {
  rating: number;
  review: string;
};

export type FilmCommentData = FilmCommentValue & {
  user: {
    username: string;
    avatar: string;
  };
};
