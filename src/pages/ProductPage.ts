import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { URLS } from '../constants/Url';

export class ProductPage extends BasePage {
  private readonly pageHeader: Locator;
  private readonly cartIcon: Locator;
  private readonly cartBadge: Locator;
  private readonly sortDropdown: Locator;
  private readonly inventoryItems: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeader = page.locator('.title');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.inventoryItems = page.locator('.inventory_item');
  }

  /**
   * Navigates directly to the inventory page
   */
  async navigateTo(): Promise<void> {
    await this.navigate(URLS.inventory);
  }

  /**
   * Verifies if the page header is visible and displays "Products"
   */
  async isPageLoaded(): Promise<boolean> {
    return (await this.pageHeader.innerText()) === 'Products';
  }

  /**
   * Gets the total number of inventory items displayed on the page
   */
  async getInventoryItemCount(): Promise<number> {
    return this.inventoryItems.count();
  }

  /**
   * Adds a product to the cart by its name
   * @param productName Name of the product (e.g., 'Sauce Labs Backpack')
   */
  async addProductToCart(productName: string): Promise<void> {
    const productLocator = this.page.locator('.inventory_item', { hasText: productName });
    const addButton = productLocator.locator('button:has-text("Add to cart")');
    await addButton.click();
  }

  /**
   * Removes a product from the cart by its name
   * @param productName Name of the product
   */
  async removeProductFromCart(productName: string): Promise<void> {
    const productLocator = this.page.locator('.inventory_item', { hasText: productName });
    const removeButton = productLocator.locator('button:has-text("Remove")');
    await removeButton.click();
  }

  /**
   * Gets the number of items currently in the cart from the badge
   */
  async getCartBadgeCount(): Promise<number> {
    if (await this.cartBadge.isVisible()) {
      const text = await this.cartBadge.innerText();
      return parseInt(text, 10);
    }
    return 0;
  }

  /**
   * Clicks on the shopping cart icon to navigate to the Cart page
   */
  async goToCart(): Promise<void> {
    await this.cartIcon.click();
  }

  /**
   * Sorts the products by option
   * @param option 'az' | 'za' | 'lohi' | 'hilo'
   */
  async sortProductsBy(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  /**
   * Gets an array of product prices currently displayed on the page
   */
  async getProductPrices(): Promise<number[]> {
    const priceElements = await this.page.locator('.inventory_item_price').allInnerTexts();
    return priceElements.map(price => parseFloat(price.replace('$', '')));
  }

  /**
   * Gets an array of product names currently displayed on the page
   */
  async getProductNames(): Promise<string[]> {
    return this.page.locator('.inventory_item_name').allInnerTexts();
  }
}
