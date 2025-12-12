import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ProductsListComponent } from '../app/ui/products-list.component';
import { RouterTestingModule } from '@angular/router/testing';

const meta: Meta<ProductsListComponent> = {
  title: 'UI/Products List',
  component: ProductsListComponent,
  tags: ['autodocs'],

  // ⭐ Ajout obligatoire pour RouterLink dans ProductCard
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule],
    }),
  ],
};

export default meta;

type Story = StoryObj<ProductsListComponent>;

export const Default: Story = {
  args: {
    products: [
      { id: 1, name: 'Stylo Bleu', price: 2.5, avgRating: 4, image: "/assets/products/stylo_bleu.png", inStock: true },
      { id: 2, name: 'Cahier A5', price: 3.9, avgRating: 5, image: "/assets/products/cahier_a5.png", inStock: true },
      { id: 6, name: 'Gomme Blanche', price: 0.9, avgRating: 3, image: "/assets/products/gomme_blanche.png", inStock: true },
      { id: 23, name: 'PC portable', price: 250, avgRating: 4, image: "/assets/products/pc_portable_bureau.png", inStock: false, isNew: true},
    ],
  },
};

export const EmptyList: Story = {
  args: {
    products: [],
  },
};
