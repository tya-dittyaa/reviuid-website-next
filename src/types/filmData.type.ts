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

export type FilmReviewValue = {
  rating: number;
  review: string;
};

export type FilmReviewData = FilmReviewValue & {
  user: {
    username: string;
    avatar: string;
  };
};
