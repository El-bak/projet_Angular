import { Meta, StoryObj } from '@storybook/angular';
import { CartSummaryComponent } from '../app/shop/cart/cart-summary.component';

const meta: Meta<CartSummaryComponent> = {
  title: 'Cart/CartSummary',
  component: CartSummaryComponent,
};

export default meta;
type Story = StoryObj<CartSummaryComponent>;

export const Example: Story = {
  args: {
    items: [
      { name: 'PC portable', price: 250, quantity: 1 },
      { name: 'USB-C Cable', price: 19, quantity: 2 },
    ],
    total: 288,
  },
};
