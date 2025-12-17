import { Meta, StoryObj } from '@storybook/angular';
import { ReviewsListComponent } from '../app/ui/reviews-list/reviews-list.component';
import { Review } from '../app/state/reviews/reviews.model';

const meta: Meta<ReviewsListComponent> = {
  component: ReviewsListComponent,
  title: 'UI/ReviewsList',
};
export default meta;

type Story = StoryObj<ReviewsListComponent>;

const mockReviews: Review[] = [
  {
    id: 'r1',
    rating: 5,
    comment: 'Parfait',
    createdAt: new Date().toISOString(),
    user: {
      id: 'u1',
      username: 'Alice',
    },
  },
  {
    id: 'r2',
    rating: 3,
    comment: 'Bof',
    createdAt: new Date().toISOString(),
    user: {
      id: 'u2',
      username: 'Bob',
    },
  },
];

export const Loading: Story = {
  args: {
    loading: true,
    reviews: [],
  },
};

export const Empty: Story = {
  args: {
    loading: false,
    reviews: [],
  },
};

export const Default: Story = {
  args: {
    loading: false,
    reviews: mockReviews,
  },
};
