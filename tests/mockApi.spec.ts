import { test, expect } from '@playwright/test';
import { API_ENDPOINTS } from '../src/constants/ApiEndpoint';

test.describe('Lesson 20: Mock API (Chặn và Giả lập dữ liệu)', () => {

  /**
   * KỸ THUẬT 1 (BÁM SÁT DỰ ÁN): Chặn API lấy bài viết của JSONPlaceholder và trả về dữ liệu Mock thành công
   */
  test('should mock JSONPlaceholder posts API (200 OK)', async ({ page }) => {
    // Sử dụng endpoint thật của dự án là API POSTS của JSONPlaceholder
    const targetApiUrl = API_ENDPOINTS.POSTS; 
    
    const mockResponseData = [
      {
        id: 1,
        title: 'Tiêu đề bài viết giả lập từ Playwright',
        body: 'Nội dung bài viết này được mock hoàn toàn trong bộ nhớ máy tính của bạn.',
        userId: 1,
      }
    ];

    // 1. Cấu hình chặn đường (route) truyền vào API URL thật của dự án
    await page.route(targetApiUrl, async (route) => {
      // Tự trả về phản hồi (fulfill) mà không gửi request lên Internet thật
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockResponseData),
      });
    });

    // 2. Đi tới một trang trống để thực hiện gọi fetch API trong trình duyệt
    await page.goto('about:blank');

    // 3. Thực hiện gọi fetch đến API URL thật đã bị chặn
    const result = await page.evaluate(async (url) => {
      const response = await fetch(url);
      return response.json();
    }, targetApiUrl);

    // 4. Assert xác nhận trình duyệt đã nhận được dữ liệu mock thay vì dữ liệu thật từ Internet
    expect(result).toBeInstanceOf(Array);
    expect(result[0].title).toBe(mockResponseData[0].title);
    expect(result[0].body).toBe(mockResponseData[0].body);
  });

  /**
   * KỸ THUẬT 2 (BÁM SÁT DỰ ÁN): Chặn API lấy chi tiết bài viết và trả về mã lỗi 404 Not Found từ Server
   */
  test('should mock JSONPlaceholder post not found (404 Error)', async ({ page }) => {
    // API lấy bài viết chi tiết ID = 999
    const targetErrorUrl = `${API_ENDPOINTS.POSTS}/999`;
    const mockErrorResponse = { error: 'Không tìm thấy bài viết yêu cầu!' };

    // 1. Cấu hình chặn đường dẫn báo lỗi
    await page.route(targetErrorUrl, async (route) => {
      await route.fulfill({
        status: 404,
        contentType: 'application/json',
        body: JSON.stringify(mockErrorResponse),
      });
    });

    // 2. Chạy thử nghiệm trong trình duyệt
    await page.goto('about:blank');

    const errorResult = await page.evaluate(async (url) => {
      const response = await fetch(url);
      return {
        status: response.status,
        data: await response.json(),
      };
    }, targetErrorUrl);

    // 3. Assert xác định trình duyệt nhận đúng mã lỗi 404 từ giả lập Mock
    expect(errorResult.status).toBe(404);
    expect(errorResult.data.error).toBe(mockErrorResponse.error);
  });

  /**
   * KỸ THUẬT 3 (THỰC CHIẾN E-COMMERCE): Chặn tải hình ảnh sản phẩm để test giao diện khi lỗi mạng/sập CDN
   */
  test.describe('Thực chiến trên ứng dụng Saucedemo', () => {
    // Sử dụng cookies đăng nhập tiêu chuẩn đã lưu trước đó của standard user
    test.use({ storageState: 'playwright/.auth/standard.json' });

    test('nên chặn tất cả ảnh sản phẩm (.jpg) để kiểm tra giao diện khi CDN ảnh bị lỗi (Abort Request)', async ({ page }) => {
      // 1. Chặn toàn bộ các request tải ảnh có định dạng .jpg từ trang web
      await page.route('**/*.jpg', async (route) => {
        // Hủy bỏ request tải ảnh (abort) để giả lập lỗi sập liên kết ảnh
        await route.abort();
      });

      // 2. Đi tới trang danh sách sản phẩm (đã bỏ qua bước login nhờ storageState)
      await page.goto('/inventory.html');

      // 3. Viết code JS trong trình duyệt để kiểm tra xem ảnh sản phẩm đầu tiên có bị lỗi hiển thị hay không.
      // Nếu ảnh bị sập/hủy bỏ, thuộc tính naturalWidth (độ rộng tự nhiên của ảnh) sẽ bằng 0.
      const isImageBroken = await page.evaluate(() => {
        const firstProductImage = document.querySelector('.inventory_item_img img') as HTMLImageElement;
        return firstProductImage ? firstProductImage.naturalWidth === 0 : false;
      });

      // 4. Assert xác nhận ảnh đã bị lỗi tải thành công như kịch bản giả lập mạng lỗi
      expect(isImageBroken).toBe(true);
    });
  });

});
