import { test, expect } from '../src/fixtures/baseTest';
import { PRODUCTS } from '../src/data/products';

test.describe('Cart Tests', () => {
  test.beforeEach(async ({ productPage }) => {
    await productPage.navigateTo();
  });

  test('should add a single item to cart and verify badge', async ({ productPage }) => {
    await productPage.addProductToCart(PRODUCTS.backpack.name);
    
    const badgeCount = await productPage.getCartBadgeCount();
    expect(badgeCount).toBe(1);
  });

  test('should add multiple items and verify cart page contains them', async ({ productPage, cartPage }) => {
    await productPage.addProductToCart(PRODUCTS.backpack.name);
    await productPage.addProductToCart(PRODUCTS.bikeLight.name);

    expect(await productPage.getCartBadgeCount()).toBe(2);

    await productPage.goToCart();
    
    // Check if items are in the cart
    const isBackpackInCart = await cartPage.isProductInCart(PRODUCTS.backpack.name);
    const isBikeLightInCart = await cartPage.isProductInCart(PRODUCTS.bikeLight.name);

    expect(isBackpackInCart).toBe(true);
    expect(isBikeLightInCart).toBe(true);
  });

  test('should remove an item from the catalog page', async ({ productPage }) => {
    await productPage.addProductToCart(PRODUCTS.onesie.name);
    expect(await productPage.getCartBadgeCount()).toBe(1);

    await productPage.removeProductFromCart(PRODUCTS.onesie.name);
    expect(await productPage.getCartBadgeCount()).toBe(0);
  });

  test('should remove an item from the cart page', async ({ productPage, cartPage }) => {
    await productPage.addProductToCart(PRODUCTS.fleeceJacket.name);
    await productPage.goToCart();

    expect(await cartPage.isProductInCart(PRODUCTS.fleeceJacket.name)).toBe(true);

    await cartPage.removeProduct(PRODUCTS.fleeceJacket.name);
    
    expect(await cartPage.isProductInCart(PRODUCTS.fleeceJacket.name)).toBe(false);
  });
});
