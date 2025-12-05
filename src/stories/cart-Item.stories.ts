// src/stories/cart-Item.stories.ts
import { Meta, StoryObj } from '@storybook/angular';
import { CartItemComponent } from '../app/shop/cart/cart-item.component';

const meta: Meta<CartItemComponent> = {
  title: 'Shop/CartItem',
  component: CartItemComponent,
};

export default meta;

type Story = StoryObj<CartItemComponent>;

export const Default: Story = {
  args: {
    item: {
      productId: 1,
      name: 'Café moulu premium',
      price: 12.5,
      quantity: 2,
      image: 'https://picsum.photos/100'
    }
  }
};

export const NoImage: Story = {
  args: {
    item: {
      productId: 2,
      name: 'Produit sans image',
      price: 9.99,
      quantity: 1
    }
  }
};

export const QuantityHigh: Story = {
  args: {
    item: {
      productId: 5,
      name: 'Pack de capsules XL',
      price: 29.99,
      quantity: 7,
      image: 'https://picsum.photos/100'
    }
  }
};
