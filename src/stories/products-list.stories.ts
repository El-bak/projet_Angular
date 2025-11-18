import { Meta, StoryObj } from '@storybook/angular';
import { ProductsListComponent } from '../app/ui/products-list.component';

const meta: Meta<ProductsListComponent> = {
  title: 'UI/Products List',
  component: ProductsListComponent,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<ProductsListComponent>;

export const Default: Story = {
  args: {
    products: [
      { id: 1, name: 'Stylo Bleu', price: 2.5, avgRating: 4 },
      { id: 2, name: 'Cahier A5', price: 3.9, avgRating: 5 },
      { id: 3, name: 'Gomme Blanche', price: 0.9, avgRating: 3 },
    ],
  },
};

export const EmptyList: Story = {
  args: {
    products: [],
  },
};
