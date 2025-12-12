import { Meta, StoryObj } from '@storybook/angular';
import { CartItemComponent } from '../app/shop/cart/cart-item.component';

// 👉 Pas d'import — Storybook 10 Angular ne supporte pas action() ni fn()
const fn = () => console.log('action fired');

const meta: Meta<CartItemComponent> = {
  title: 'Cart/CartItem',
  component: CartItemComponent,
};

export default meta;

type Story = StoryObj<CartItemComponent>;

export const Default: Story = {
  args: {
    item: {
      productId: 1,
      name: 'PC portable',
      price: 200,
      quantity: 1,
      image: '/assets/products/pc_portable_bureau.png'
    },
    remove: fn,
    quantityChange: fn
  },
};
