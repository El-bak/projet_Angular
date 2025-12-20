export interface AdminStats {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;

  topProducts: {
    productId: string;
    name: string;
    sold: number;
    revenue: number;
  }[];

  recentOrders: {
    id: string;
    user: string;
    total: number;
    createdAt: string;
    status: string;
  }[];
}

export interface AdminState {
  stats: AdminStats | null;
  loading: boolean;
  error: string | null;
}
