import { test, expect } from '../src/fixtures/apiFixture';

// Chặn gửi Cookie đăng nhập mặc định của Saucedemo lên các API bên ngoài
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Lesson 16.4: Advanced API Testing (Params, Upload, Auth)', () => {

  /**
   * Kỹ thuật 1: Truyền Query Parameters để phân trang và lọc dữ liệu (Pagination)
   */
  test('should successfully retrieve posts with query parameters (Pagination)', async ({ advancedApi }) => {
    const userId = 1;
    const limit = 3;

    // Gửi GET request kèm theo params { userId: 1, _limit: 3 }
    const response = await advancedApi.getPostsWithParams(userId, limit);

    // Xác thực status code thành công
    expect(response.status()).toBe(200);

    const json = await response.json();
    
    // Xác thực API chỉ trả về đúng 3 phần tử (phân trang hoạt động)
    expect(Array.isArray(json)).toBe(true);
    expect(json.length).toBe(limit);

    // Xác thực toàn bộ bài viết trả về đều thuộc về userId = 1 (lọc hoạt động)
    for (const post of json) {
      expect(post.userId).toBe(userId);
    }
  });

  /**
   * Kỹ thuật 2: Tải tệp tin lên server qua Multipart Form Data (File Upload)
   */
  test('should successfully upload a text file (Multipart Upload)', async ({ advancedApi }) => {
    const fileName = 'test_automation.txt';
    const fileContent = 'Hello, this is automated API testing with Playwright!';

    // Gửi POST request đính kèm tệp tin văn bản
    const response = await advancedApi.uploadFile(fileName, fileContent);

    // Xác thực status code thành công
    expect(response.status()).toBe(200);

    const json = await response.json();
    
    // Server httpbingo.org/httpbin.org sẽ phản hồi lại thông tin file nhận được trong trường 'files'
    expect(json).toHaveProperty('files');
    expect(json.files).toHaveProperty('file');
    
    // httpbingo.org trả về mảng chuỗi, còn httpbin.org trả về chuỗi đơn.
    const receivedContent = Array.isArray(json.files.file) ? json.files.file[0] : json.files.file;
    expect(receivedContent).toBe(fileContent);
  });

  /**
   * Kỹ thuật 3: Đính kèm Bearer Token vào headers để xác thực API (Authorization Auth)
   */
  test('should successfully validate authentication with Bearer Token', async ({ advancedApi }) => {
    const mockToken = 'my_secret_jwt_token_12345';

    // Gửi GET request đính kèm Header Authorization: Bearer
    const response = await advancedApi.checkBearerAuth(mockToken);

    // Xác thực status code thành công (đã được cấu hình trong BaseApi kiểm tra ok)
    expect(response.status()).toBe(200);

    const json = await response.json();
    
    // Server httpbin.org/bearer xác nhận tính đúng đắn của token
    expect(json.authenticated).toBe(true);
    expect(json.token).toBe(mockToken);
  });

});
