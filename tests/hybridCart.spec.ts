import { test, expect } from '../src/fixtures/baseTest';
import { PRODUCTS } from '../src/data/products';

test.use({ storageState: 'playwright/.auth/standard.json' });

test.describe('Lesson 16.5: Hybrid Testing (API/State Setup + UI Verification)', () => {

  test('should bypass product listing page and load cart directly with items', async ({ page, productPage, cartPage }) => {
    // 1. Dùng Page Object để điều hướng tới trang danh sách sản phẩm (Đã tối ưu)
    await productPage.navigateTo();

    // 2. [MÔ PHỎNG API SETUP]: Ghi vào LOCAL STORAGE
    // ID 4: Sauce Labs Backpack, ID 0: Sauce Labs Bike Light
    await page.evaluate(() => {
      window.localStorage.setItem('cart-contents', '[4, 0]');
    });

    // 3. [UI VALIDATION]: Dùng Page Object để đi tới trang Giỏ hàng (Đã tối ưu)
    await productPage.goToCart();

    // 4. Assert xem giao diện trang Giỏ hàng có hiển thị đúng 2 sản phẩm đó không
    const isBackpackInCart = await cartPage.isProductInCart(PRODUCTS.backpack.name);
    const isBikeLightInCart = await cartPage.isProductInCart(PRODUCTS.bikeLight.name);

    expect(isBackpackInCart).toBe(true);
    expect(isBikeLightInCart).toBe(true);
    expect(await cartPage.getCartBadgeCount()).toBe('2');
  });

});
