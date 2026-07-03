import { test, expect } from '../src/fixtures/apiFixture';
import { BaseApi } from '../src/api/BaseApi';
import { API_ENDPOINTS } from '../src/constants/ApiEndpoint';

/**
 * Lớp TestApi kế thừa từ BaseApi để phục vụ việc kiểm thử tích hợp (Unit/Integration Test)
 * cho chính cơ chế gọi API của framework lên một máy chủ mock công cộng.
 */
class TestApi extends BaseApi {
  async testGet() {
    return this.get(API_ENDPOINTS.MOCK_GET);
  }

  async testPost(data: any) {
    return this.post(API_ENDPOINTS.MOCK_POST, data);
  }
}

test.describe('Kiểm thử Xác minh Kiến trúc BaseApi', () => {
  test('should successfully perform GET and POST via BaseApi', async ({ request }) => {
    const testApi = new TestApi(request);

    // 1. Xác minh phương thức GET hoạt động chính xác
    const getResponse = await testApi.testGet();
    expect(getResponse.ok()).toBe(true);

    const getJson = await getResponse.json();
    expect(getJson.url).toContain('/get');
    // Xác nhận default headers (Accept và Content-Type) đã tự động được đính kèm bởi BaseApi
    const acceptHeader = getJson.headers['Accept'];
    const receivedAccept = Array.isArray(acceptHeader) ? acceptHeader[0] : acceptHeader;
    expect(receivedAccept).toBe('application/json');

    // 2. Xác minh phương thức POST và truyền body data hoạt động chính xác
    const postData = { testKey: 'Playwright API Automation' };
    const postResponse = await testApi.testPost(postData);
    expect(postResponse.ok()).toBe(true);

    const postJson = await postResponse.json();
    expect(postJson.json.testKey).toBe('Playwright API Automation');
  });
});
