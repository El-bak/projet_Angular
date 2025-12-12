import { Meta, StoryObj } from '@storybook/angular';
import { ProductDetailsComponent } from '../app/ui/product-details.component';

const fn = () => console.log('action fired');

const meta: Meta<ProductDetailsComponent> = {
  title: 'Product/ProductDetails',
  component: ProductDetailsComponent,
  args: {
    name: 'PC portable ',
    price: 250,
    avgRating: 4,
    description: 'PC portable pour travaille avec 8 GB de Memory, 16 GB de RAM, OS Windows 11, état de la batterie : neuf',
    image: '/assets/products/pc_portable_bureau.png',
    add: fn,
  },
};

export default meta;

type Story = StoryObj<ProductDetailsComponent>;

export const Default: Story = {};
