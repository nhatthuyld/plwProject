import { test, expect } from '../src/fixtures/baseTest';
import { PRODUCTS } from '../src/data/products';
import { MESSAGES } from '../src/constants/Message';
import { URLS } from '../src/constants/Url';
import { RandomUtil } from '../src/utils/RandomUtil';

test.describe('Checkout Tests', () => {
  test.beforeEach(async ({ productPage }) => {
    await productPage.navigateTo();
  });

  test('should successfully purchase a product', async ({ productPage, cartPage, checkoutPage }) => {
    // 1. Add backpack to cart and navigate to checkout
    await productPage.addProductToCart(PRODUCTS.backpack.name);
    await productPage.goToCart();
    await cartPage.clickCheckout();

    // 2. Fill information step using RandomUtil
    const firstName = RandomUtil.getRandomString(6);
    const lastName = RandomUtil.getRandomString(6);
    const postalCode = RandomUtil.getRandomPostalCode();
    
    await checkoutPage.fillInformation(firstName, lastName, postalCode);
    
    // Assertion: Redirected to overview step
    expect(await checkoutPage.getUrl()).toContain(URLS.checkoutStepTwo);

    // 3. Verify total is correct (Backpack is $29.99, tax is $2.40, Total is $32.39)
    const summaryTotalText = await checkoutPage.getSummaryTotalText();
    expect(summaryTotalText).toContain('Total: $32.39');

    // 4. Click finish
    await checkoutPage.clickFinish();

    // Assertion: Checkout complete
    expect(await checkoutPage.getUrl()).toContain(URLS.checkoutComplete);
    expect(await checkoutPage.getCompleteHeader()).toContain(MESSAGES.checkout.successTitle);
    expect(await checkoutPage.getCompleteText()).toContain(MESSAGES.checkout.successDescription);
  });

  test('should validate checkout form requirements', async ({ productPage, cartPage, checkoutPage }) => {
    await productPage.addProductToCart(PRODUCTS.boltTShirt.name);
    await productPage.goToCart();
    await cartPage.clickCheckout();

    // Try submitting empty firstName
    await checkoutPage.fillInformation('', 'Doe', '12345');
    expect(await checkoutPage.getErrorMessage()).toContain(MESSAGES.checkout.requiredFirstNameError);

    // Try submitting empty lastName
    await checkoutPage.fillInformation('John', '', '12345');
    expect(await checkoutPage.getErrorMessage()).toContain(MESSAGES.checkout.requiredLastNameError);

    // Try submitting empty postal code
    await checkoutPage.fillInformation('John', 'Doe', '');
    expect(await checkoutPage.getErrorMessage()).toContain(MESSAGES.checkout.requiredPostalCodeError);
  });
});
