import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ProductCardComponent } from '../app/ui/product-card.component';
import { RouterTestingModule } from '@angular/router/testing';

const meta: Meta<ProductCardComponent> = {
  title: 'UI/ProductCard',
  component: ProductCardComponent,
  tags: ['autodocs'],

  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule],
    }),
  ],
};

export default meta;

type Story = StoryObj<ProductCardComponent>;

export const Default: Story = {
  args: {
    id: 9,
    name: 'Feutre Noir',
    price: 2,
    avgRating: 4,
    image: '/assets/products/feutre_noir.png',
    isNew: false,
    inStock: true,
    add: () => console.log('add'),
  },
};

export const NoRating: Story = {
  args: {
    id: 1,
    name: 'Stylo Bleu',
    price: 2.5,
    avgRating: 4,
    image: '/assets/products/stylo_bleu.png',
    isNew: false,
    inStock: true,
    add: () => console.log('add'),
  },
};

export const NewBadge: Story = {
  args: {
    id: 3,
    name: 'Classeur Rouge',
    price: 4.5,
    avgRating: 3,
    image: '/assets/products/classeur_rouge.png',
    isNew: true,
    inStock: false,
    add: () => console.log('add'),
  },
};

export const OutOfStock: Story = {
  args: {
    id: 4,
    name: 'PC Portable',
    price: 250,
    avgRating: 4,
    image: '/assets/products/pc_portable_bureau.png',
    isNew: true,
    inStock: false,
    add: () => console.log('add'),
  },
};
