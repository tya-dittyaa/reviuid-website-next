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
  id: string;
  rating: number;
  review: string;
  updatedAt: Date;
};

export type FilmReviewData = FilmReviewValue & {
  user: {
    id: string;
    username: string;
    avatar: string;
  };
};
