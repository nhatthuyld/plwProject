export interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
}
export const PRODUCTS: Record<string, Product> = {

  backpack: {
    id: 'sauce-labs-backpack',
    name: 'Sauce Labs Backpack',
    price: '$29.99',
    description: 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled usability.',
  },
  bikeLight: {
    id: 'sauce-labs-bike-light',
    name: 'Sauce Labs Bike Light',
    price: '$9.99',
    description: "A red light for your bike in the back and a clear light for the front. Check back later for our light strength increase.",
  },
  boltTShirt: {
    id: 'sauce-labs-bolt-t-shirt',
    name: 'Sauce Labs Bolt T-Shirt',
    price: '$15.99',
    description: 'Get your testing superhero on with the Sauce Labs bolt T-shirt. From the refined metal armor to the rugged leather cap and belt, this t-shirt is perfect for any occasion.',
  },
  fleeceJacket: {
    id: 'sauce-labs-fleece-jacket',
    name: 'Sauce Labs Fleece Jacket',
    price: '$49.99',
    description: "It's not every day that you come across a jacket this warm and beautiful. A solid-color fleece jacket features a full-zip front, mock neck, and zippered hand pockets for secure storage.",
  },
  onesie: {
    id: 'sauce-labs-onesie',
    name: 'Sauce Labs Onesie',
    price: '$7.99',
    description: "Rib-knit infant onesie features reinforced three-snap closure and double-needle ribbed binding on neck, shoulders, sleeves, and legs.",
  },
  redTShirt: {
    id: 'test-allthethings-t-shirt-red',
    name: 'Test.allTheThings() T-Shirt (Red)',
    price: '$15.99',
    description: "This classic Sauce Labs t-shirt is perfect for your next standard dev or QA team session. It's a tri-blend fabric that is soft and durable.",
  },
} as const;
