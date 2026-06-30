/**
 * Định nghĩa các Request Headers tái sử dụng trong hệ thống.
 * Giúp chuẩn hóa định dạng dữ liệu (JSON) và dễ dàng cấu hình thêm Authorization sau này.
 */
export const HEADERS = {
  // Headers mặc định cho JSON APIs
  JSON_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },

  /**
   *  tạo nhanh header chứa Token xác thực Bearer.
   * @param token Chuỗi JWT hoặc Access Token.
   */
  getAuthHeader: (token: string) => ({
    'Authorization': `Bearer ${token}`,
  }),
} as const;
