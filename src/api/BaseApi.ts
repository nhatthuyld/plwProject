import { APIRequestContext, APIResponse } from '@playwright/test';
import { HEADERS } from '../constants/Header';

/**
 * Lớp BaseApi đóng vai trò là lớp cha cho toàn bộ các lớp gọi API chuyên biệt.
 * Nó thiết lập sẵn cấu trúc gọi HTTP thông qua APIRequestContext của Playwright.
 */
export class BaseApi {
  // Đối tượng APIRequestContext cung cấp bởi Playwright để gọi API trực tiếp
  protected request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  /**
   * Phương thức lõi chuyên thực hiện và xử lý toàn bộ các HTTP Requests.
   * Tự động trộn Headers mặc định và kiểm tra lỗi API (`response.ok()`).
   * 
   * @param method Phương thức HTTP (GET, POST, PUT, DELETE).
   * @param url Đường dẫn gọi API (endpoint).
   * @param options Các tham số tùy chọn bổ sung như body data và headers riêng.
   * @returns Trả về đối tượng APIResponse gốc từ Playwright.
   */
  private async execute(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    options: { data?: any; headers?: Record<string, string> } = {}
  ): Promise<APIResponse> {
    // Trộn lẫn các header mặc định (JSON Content-Type, Accept) với headers tùy biến truyền vào
    const mergedHeaders = {
      ...HEADERS.JSON_HEADERS,
      ...options.headers,
    };

    // Thực hiện cuộc gọi API bằng phương thức fetch() của Playwright
    const response = await this.request.fetch(url, {
      method,
      data: options.data,
      headers: mergedHeaders,
    });

    // SOLID & Fail-Fast: Kiểm tra nếu phản hồi trả về có mã trạng thái không thành công (không nằm trong dải 2xx)
    if (!response.ok()) {
      throw new Error(
        `[LỖI GỌI API] API đến đường dẫn ${url} bị thất bại với mã trạng thái: ${response.status()} (${response.statusText()})`
      );
    }

    return response;
  }

  /**
   * Thực hiện cuộc gọi GET để truy xuất thông tin từ máy chủ.
   */
  protected async get(url: string, headers?: Record<string, string>): Promise<APIResponse> {
    return this.execute('GET', url, { headers });
  }

  /**
   * Thực hiện cuộc gọi POST để khởi tạo dữ liệu mới trên máy chủ.
   */
  protected async post(url: string, data?: any, headers?: Record<string, string>): Promise<APIResponse> {
    return this.execute('POST', url, { data, headers });
  }

  /**
   * Thực hiện cuộc gọi PUT để chỉnh sửa/cập nhật dữ liệu hiện có trên máy chủ.
   */
  protected async put(url: string, data?: any, headers?: Record<string, string>): Promise<APIResponse> {
    return this.execute('PUT', url, { data, headers });
  }

  /**
   * Thực hiện cuộc gọi DELETE để xóa bỏ dữ liệu trên máy chủ.
   */
  protected async delete(url: string, headers?: Record<string, string>): Promise<APIResponse> {
    return this.execute('DELETE', url, { headers });
  }
}
