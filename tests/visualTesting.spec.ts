import { test, expect } from '@playwright/test';
import { URLS } from '../src/constants/Url';

test.describe('Lesson 19: Visual Testing (Chụp ảnh & Đối chiếu giao diện)', () => {

  test('should match the baseline login page screenshot', async ({ page }) => {
    // 1. Đi tới trang đăng nhập Saucedemo
    await page.goto(URLS.home);

    // 2. Chụp ảnh màn hình và so sánh với ảnh mẫu chuẩn 'login-baseline.png'
    // Lần chạy đầu tiên sẽ ghi lại ảnh mẫu (Tự động FAIL để tạo baseline)
    // Lần chạy thứ hai trở đi sẽ so sánh trực tiếp và PASS nếu khớp 100%
    await expect(page).toHaveScreenshot('login-baseline.png');
  });

  test('should fail and show visual diff when button style changes', async ({ page }) => {
    // 1. Đi tới trang đăng nhập Saucedemo
    await page.goto(URLS.home);

    // 2. [GIẢ LẬP LỖI UI]: Đổi màu nút Đăng nhập sang màu đỏ bằng Javascript (mặc định là màu xanh lá)
    await page.evaluate(() => {
      const loginButton = document.querySelector('#login-button') as HTMLInputElement;
      if (loginButton) {
        loginButton.style.backgroundColor = 'red';
      }
    });

    // 3. So sánh với ảnh mẫu chuẩn của giao diện gốc 'login-baseline.png'
    // Bài test này chắc chắn sẽ FAIL vì màu nút (đỏ) lệch với ảnh mẫu chuẩn (xanh lá)
    await expect(page).toHaveScreenshot('login-baseline.png');
  });

});
