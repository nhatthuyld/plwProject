import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { URLS } from '../constants/Url';

export class CartPage extends BasePage {
  private readonly cartItems: Locator;
  private readonly checkoutButton: Locator;
  private readonly continueShoppingButton: Locator;
  private readonly cartBadge: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  /**
   * Navigates directly to the cart page
   */
  async navigateTo(): Promise<void> {
    await this.navigate(URLS.cart);
  }

  /**
   * Gets list of names of all items in the cart
   */
  async getCartItemNames(): Promise<string[]> {
    return this.page.locator('.inventory_item_name').allInnerTexts();
  }

  /**
   * Gets the total number of item elements in the cart page
   */
  async getCartItemCount(): Promise<number> {
    return this.cartItems.count();
  }

  /**
   * Checks if a product exists in the cart by name
   */
  async isProductInCart(productName: string): Promise<boolean> {
    const items = await this.getCartItemNames();
    return items.includes(productName);
  }

  /**
   * Removes an item from the cart page
   * @param productName Name of the product
   */
  async removeProduct(productName: string): Promise<void> {
    const itemLocator = this.page.locator('.cart_item', { hasText: productName });
    const removeButton = itemLocator.locator('button:has-text("Remove")');
    await removeButton.click();
  }

  /**
   * Clicks the Checkout button to begin checkout process
   */
  async clickCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  /**
   * Clicks the Continue Shopping button
   */
  async clickContinueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  /**
   * Gets the number of items displayed on the shopping cart badge
   */
  async getCartBadgeCount(): Promise<string> {
    return this.cartBadge.innerText();
  }
}

