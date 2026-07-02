import { APIResponse } from '@playwright/test';
import { BaseApi } from './BaseApi';
import { HEADERS } from '../constants/Header';
import { API_ENDPOINTS } from '../constants/ApiEndpoint';

/**
 * Lớp AdvancedApi dùng để minh họa các kỹ thuật kiểm thử API nâng cao trong Playwright:
 * 1. Lọc và phân trang dữ liệu (Query Parameters / Params)
 * 2. Tải tệp tin lên server (Multipart File Upload)
 * 3. Gửi Token xác thực dạng Bearer (Authorization Headers)
 */
export class AdvancedApi extends BaseApi {

  /**
   * Lấy danh sách bài viết theo userId và giới hạn số lượng bài viết (Phân trang - Pagination).
   * Endpoint thực tế: GET https://jsonplaceholder.typicode.com/posts?userId=1&_limit=3
   */
  async getPostsWithParams(userId: number, limit: number): Promise<APIResponse> {
    const url = API_ENDPOINTS.POSTS;
    
    // Gọi phương thức GET kế thừa từ BaseApi và truyền params
    return this.get(url, undefined, {
      userId,
      _limit: limit,
    });
  }

  /**
   * Tải tệp tin văn bản lên máy chủ kiểm thử.
   * Sử dụng dịch vụ httpbin.org để phản hồi dữ liệu file upload.
   * Endpoint thực tế: POST https://httpbin.org/post
   */
  async uploadFile(fileName: string, fileContent: string): Promise<APIResponse> {
    const url = API_ENDPOINTS.MOCK_POST;
    
    // Gọi phương thức execute với tùy chọn multipart
    return this.execute('POST', url, {
      multipart: {
        file: {
          name: fileName,
          mimeType: 'text/plain',
          buffer: Buffer.from(fileContent, 'utf-8'),
        },
      },
    });
  }

  /**
   * Gửi yêu cầu xác thực bằng Token Bearer để kiểm tra headers.
   * Sử dụng dịch vụ httpbin.org/bearer để kiểm tra tính hợp lệ của Header.
   * Endpoint thực tế: GET https://httpbin.org/bearer
   */
  async checkBearerAuth(token: string): Promise<APIResponse> {
    const url = API_ENDPOINTS.MOCK_BEARER;
    
    // Lấy header Authorization: Bearer <token> từ Helper constants
    const authHeaders = HEADERS.getAuthHeader(token);
    
    // Gọi GET kèm theo Authorization Header
    return this.get(url, authHeaders);
  }
}
