export interface Review {
  id: string;
  user: {
    id: string;
    username: string;
  };
  rating: number; // 1 à 5
  comment: string;
  createdAt: string;
}

export interface ReviewsState {
  entities : {
    [productId: number]: Review[];
  };
  loading: boolean;
  error: string | null;
}
