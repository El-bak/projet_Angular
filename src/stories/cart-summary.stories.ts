// src/stories/CartSummary.stories.ts
import { Meta, StoryObj } from '@storybook/angular';
import { CartSummaryComponent } from '../app/shop/cart/cart-summary.component';

const meta: Meta<CartSummaryComponent> = {
  title: 'Shop/CartSummary',
  component: CartSummaryComponent,
};

export default meta;

type Story = StoryObj<CartSummaryComponent>;

export const Default: Story = {
  args: {
    items: [
      { name: 'Café', quantity: 2, price: 12 },
      { name: 'Capsules', quantity: 1, price: 8.5 }
    ],
    total: 32.5,
  }
};
