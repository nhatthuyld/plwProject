import { test as base } from './baseTest';
import { LoginApi } from '../api/LoginApi';
import { ProductApi } from '../api/ProductApi';
import { CartApi } from '../api/CartApi';

// Khai báo kiểu dữ liệu cho các API Fixtures
type ApiFixtures = {
  loginApi: LoginApi;
  productApi: ProductApi;
  cartApi: CartApi;
};

/**
 * Mở rộng từ baseTest (chứa các UI page object fixtures) để tạo ra bộ Fixture tổng hợp.
 * Điều này cho phép một test case có thể sử dụng cả UI Pages và API Classes cùng lúc.
 */
export const test = base.extend<ApiFixtures>({
  // Khởi tạo LoginApi tự động từ đối tượng request (APIRequestContext) của Playwright
  loginApi: async ({ request }, use) => {
    await use(new LoginApi(request));
  },

  // Khởi tạo ProductApi
  productApi: async ({ request }, use) => {
    await use(new ProductApi(request));
  },

  // Khởi tạo CartApi
  cartApi: async ({ request }, use) => {
    await use(new CartApi(request));
  },
});

// Xuất lại expect và test để sử dụng trực tiếp trong các file kiểm thử
export { expect } from './baseTest';
