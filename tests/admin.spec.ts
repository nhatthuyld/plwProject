import { test, expect } from '../src/fixtures/baseTest';
import { URLS } from '../src/constants/Url';

// Chỉ định sử dụng session lưu trữ của tài khoản admin
test.use({ storageState: 'playwright/.auth/admin.json' });

test.describe('Admin Tests', () => {
  test('should access inventory page as admin', async ({ productPage }) => {
    // Đi thẳng đến trang danh sách sản phẩm bằng session admin đã có sẵn
    await productPage.navigateTo();
    
    // Kiểm tra xem URL có chứa '/inventory.html' không
    const currentUrl = await productPage.getUrl();
    expect(currentUrl).toContain(URLS.inventory);

    // Kiểm tra tiêu đề trang đã load đúng "Products"
    const isLoaded = await productPage.isPageLoaded();
    expect(isLoaded).toBe(true);
  });
});
