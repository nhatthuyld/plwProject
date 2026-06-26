import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";

// declare the types of fixtures that will be available to all tests
type MyFixtures = {
  loginPage: LoginPage;
  productPage: ProductPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
};

// Extend basic test with custom fixtures
export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    // Set up the fixture
    const loginPage = new LoginPage(page);
    // Pass the fixture to the test
    await use(loginPage);
  },
  productPage: async ({ page }, use) => {
    const productPage = new ProductPage(page);
    await use(productPage);
  },
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },
});

// Re-export expect from Playwright for ease of use in tests
export { expect } from "@playwright/test";
export type { Page } from "@playwright/test";
