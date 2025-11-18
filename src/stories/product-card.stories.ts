import { Meta, StoryObj } from '@storybook/angular';
import { ProductCardComponent } from '../app/ui/product-card.component';

const meta: Meta<ProductCardComponent> = {
  title: 'UI/Product Card',
  component: ProductCardComponent,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<ProductCardComponent>;

export const Default: Story = {
  args: {
    name: 'Feutre Noir',
    price: 2,
    avgRating: 4,
  },
};

export const NoRating: Story = {
  args: {
    name: 'Stylo Bleu',
    price: 2.5,
    avgRating: null,
  },
};
