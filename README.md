# Hướng dẫn học Playwright Automation Testing (E-commerce)

Dự án mẫu này được xây dựng nhằm giúp bạn làm quen và thực hành **Playwright** kết hợp với **TypeScript** thông qua mô hình thiết kế **Page Object Model (POM)** trên trang web thương mại điện tử demo phổ biến [SauceDemo](https://www.saucedemo.com/).

---

## 📂 Cấu trúc thư mục

```text
playwright-ecommerce/
│
├── src/
│   ├── api/
│   │   └── LoginApi.ts        # Cách cấu trúc gọi API (API Request) để chuẩn bị session/data
│   │
│   ├── constants/
│   │   ├── Message.ts         # Quản lý các chuỗi thông báo (Success, Error, Validation)
│   │   └── Url.ts             # Quản lý đường dẫn (Endpoint/Url) của các trang web
│   │
│   ├── data/
│   │   ├── users.ts           # Thông tin tài khoản test (standard, locked out, invalid...)
│   │   └── products.ts        # Dữ liệu sản phẩm mẫu (tên, giá, mô tả) dùng để đối chiếu
│   │
│   ├── fixtures/
│   │   └── baseTest.ts        # Thiết lập Custom Fixture để khởi tạo tự động các Page Objects
│   │
│   ├── pages/
│   │   ├── BasePage.ts        # Lớp cha chứa các hàm tiện ích chung (điều hướng, lấy URL...)
│   │   ├── LoginPage.ts       # Page Object cho trang Đăng nhập
│   │   ├── ProductPage.ts     # Page Object cho trang Danh sách sản phẩm (Inventory)
│   │   └── CartPage.ts        # Page Object cho trang Giỏ hàng & Thanh toán (Cart & Checkout)
│   │
│   └── utils/
│       ├── RandomUtil.ts      # Hàm tiện ích tạo dữ liệu ngẫu nhiên (chuỗi, số, email)
│       └── DateUtil.ts        # Hàm tiện ích lấy/định dạng thời gian
│
├── tests/
│   ├── login.spec.ts          # Bộ kiểm thử chức năng Đăng nhập
│   ├── cart.spec.ts           # Bộ kiểm thử giỏ hàng (thêm/xóa sản phẩm)
│   └── checkout.spec.ts       # Bộ kiểm thử quy trình mua hàng & thanh toán (E2E Checkout)
│
├── playwright.config.ts       # Cấu hình chính của Playwright (Browsers, Report, Screenshot...)
├── package.json               # Quản lý thư viện cài đặt và các câu lệnh chạy nhanh (Scripts)
├── tsconfig.json              # Cấu hình biên dịch TypeScript
├── .gitignore                 # Bỏ qua các file không cần đẩy lên Git (node_modules, reports...)
└── README.md                  # Hướng dẫn sử dụng dự án
```

---

## 🛠️ Hướng dẫn cài đặt

Để bắt đầu chạy dự án, bạn thực hiện các bước sau:

1. **Cài đặt thư viện dependencies:**
   ```bash
   npm install
   ```

2. **Cài đặt môi trường trình duyệt của Playwright:**
   ```bash
   npx playwright install
   ```

---

## 🚀 Các lệnh chạy Test

Dưới đây là một số câu lệnh có sẵn được cấu hình trong `package.json`:

* **Chạy toàn bộ các test case ở chế độ ẩn danh (headless):**
  ```bash
  npm run test
  ```

* **Chạy test có hiển thị trình duyệt trực quan (headed mode):**
  ```bash
  npm run test:headed
  ```

* **Mở giao diện tương tác UI Mode của Playwright để gỡ lỗi trực quan:**
  ```bash
  npm run test:ui
  ```

* **Xem báo cáo kết quả kiểm thử sau khi chạy:**
  ```bash
  npm run test:report
  ```

* **Chạy một file test cụ thể (Ví dụ file `login`):**
  ```bash
  npx playwright test tests/login.spec.ts
  ```

---

## 💡 Các khái niệm chính để học tập

### 1. Page Object Model (POM)
Mô hình tách biệt code tương tác với giao diện và code kịch bản test:
* **Các file trong `src/pages/`:** Chỉ chứa các locator và action (các thao tác click, fill, select).
* **Các file trong `tests/`:** Chỉ chứa kịch bản kiểm thử (test steps) và các câu lệnh so sánh kết quả (`expect`).

### 2. Custom Fixtures (`baseTest.ts`)
Thay vì mỗi test case đều phải viết `const loginPage = new LoginPage(page);`, dự án mẫu sử dụng kỹ thuật **Playwright Fixtures** để tự động khởi tạo. Bạn chỉ cần gọi trực tiếp tên trang trong tham số hàm:
```typescript
test('Test login thành công', async ({ loginPage, productPage }) => {
  await loginPage.login('username', 'password');
  // ...
});
```

### 3. Data-driven Testing
Dữ liệu test được quản lý tập trung ở `src/data/` giúp dễ dàng thay đổi mà không phải sửa lại code kịch bản test.

Chúc bạn học tập tốt và làm chủ Playwright Automation Testing!
