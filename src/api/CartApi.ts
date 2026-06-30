import { APIResponse } from '@playwright/test';
import { BaseApi } from './BaseApi';
import { API_ENDPOINTS } from '../constants/ApiEndpoint';
import { HEADERS } from '../constants/Header';

/**
 * Lớp CartApi xử lý các cuộc gọi API liên quan đến quản lý giỏ hàng của người dùng.
 * Kế thừa từ BaseApi để sử dụng các phương thức gọi HTTP lõi.
 */
export class CartApi extends BaseApi {
  /**
   * Thêm sản phẩm vào giỏ hàng với số lượng chỉ định.
   * 
   * @param productId Mã định danh sản phẩm.
   * @param quantity Số lượng sản phẩm cần thêm.
   * @param token (Tùy chọn) Token xác thực nếu giỏ hàng yêu cầu đăng nhập.
   * @returns APIResponse.
   */
  async addToCart(productId: string | number, quantity: number, token?: string): Promise<APIResponse> {
    const headers = token ? HEADERS.getAuthHeader(token) : undefined;
    return this.post(
      API_ENDPOINTS.CART,
      { productId, quantity },
      headers
    );
  }

  /**
   * Xóa một sản phẩm cụ thể khỏi giỏ hàng.
   * 
   * @param productId Mã định danh sản phẩm cần xóa.
   * @param token (Tùy chọn) Token xác thực.
   * @returns APIResponse.
   */
  async removeFromCart(productId: string | number, token?: string): Promise<APIResponse> {
    const headers = token ? HEADERS.getAuthHeader(token) : undefined;
    const url = `${API_ENDPOINTS.CART}/${productId}`;
    return this.delete(url, headers);
  }

  /**
   * Lấy thông tin chi tiết và danh sách các sản phẩm đang có trong giỏ hàng.
   * 
   * @param token (Tùy chọn) Token xác thực.
   * @returns APIResponse.
   */
  async getCart(token?: string): Promise<APIResponse> {
    const headers = token ? HEADERS.getAuthHeader(token) : undefined;
    return this.get(API_ENDPOINTS.CART, headers);
  }

  /**
   * Xóa sạch toàn bộ sản phẩm có trong giỏ hàng.
   * 
   * @param token (Tùy chọn) Token xác thực.
   * @returns APIResponse.
   */
  async clearCart(token?: string): Promise<APIResponse> {
    const headers = token ? HEADERS.getAuthHeader(token) : undefined;
    return this.delete(API_ENDPOINTS.CART, headers);
  }
}
