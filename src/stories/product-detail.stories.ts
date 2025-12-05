// src/stories/ProductDetails.stories.ts
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ProductDetailsPageComponent } from '../app/pages/product-detail-page/product-detail-page.component';
import { provideMockStore } from '@ngrx/store/testing';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { of } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

const meta: Meta<ProductDetailsPageComponent> = {
  title: 'Shop/ProductDetails',
  component: ProductDetailsPageComponent,

  decorators: [
    moduleMetadata({
      imports: [CommonModule, RouterLink, MatButtonModule],
      providers: [
        // ⭐ Mock du ActivatedRoute
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1' // Simule /product/1
              }
            },
            paramMap: of({
              get: () => '1'
            })
          }
        },

        // ⭐ Mock NgRx Store
        provideMockStore({
          initialState: {
            products: {
              selectedProduct: {
                id: 1,
                name: 'Café Premium',
                price: 12.99,
                description: 'Un café d’exception.',
                image: 'https://picsum.photos/400',
                ratings: [
                  { user_id: 1, value: 4 },
                  { user_id: 2, value: 5 }
                ],
                inStock: true
              },
              loading: false,
              error: null
            },
            cart: {
              items: []
            }
          }
        })
      ]
    })
  ]
};

export default meta;

type Story = StoryObj<ProductDetailsPageComponent>;

export const Default: Story = {};
