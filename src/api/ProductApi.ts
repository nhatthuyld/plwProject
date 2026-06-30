import { APIResponse } from '@playwright/test';
import { BaseApi } from './BaseApi';
import { API_ENDPOINTS } from '../constants/ApiEndpoint';

/**
 * Lớp ProductApi xử lý các cuộc gọi API liên quan đến quản lý sản phẩm (CRUD).
 * Kế thừa từ BaseApi để sử dụng các phương thức gọi HTTP lõi.
 */
export class ProductApi extends BaseApi {
  /**
   * Truy xuất toàn bộ danh sách sản phẩm.
   * 
   * @returns APIResponse.
   */
  async getProducts(): Promise<APIResponse> {
    return this.get(API_ENDPOINTS.PRODUCTS);
  }

  /**
   * Lấy thông tin chi tiết của một sản phẩm theo ID.
   * 
   * @param id Mã định danh sản phẩm.
   * @returns APIResponse.
   */
  async getProductById(id: string | number): Promise<APIResponse> {
    return this.get(API_ENDPOINTS.PRODUCT_BY_ID(id));
  }

  /**
   * Tạo mới một sản phẩm trên hệ thống.
   * 
   * @param productData Thông tin sản phẩm cần tạo (tên, giá, mô tả...).
   * @returns APIResponse.
   */
  async createProduct(productData: any): Promise<APIResponse> {
    return this.post(API_ENDPOINTS.PRODUCTS, productData);
  }

  /**
   * Cập nhật thông tin của một sản phẩm hiện có.
   * 
   * @param id Mã định danh sản phẩm cần chỉnh sửa.
   * @param productData Các thuộc tính sản phẩm cần cập nhật mới.
   * @returns APIResponse.
   */
  async updateProduct(id: string | number, productData: any): Promise<APIResponse> {
    return this.put(API_ENDPOINTS.PRODUCT_BY_ID(id), productData);
  }

  /**
   * Xóa bỏ hoàn toàn một sản phẩm khỏi hệ thống.
   * 
   * @param id Mã định danh sản phẩm cần xóa.
   * @returns APIResponse.
   */
  async deleteProduct(id: string | number): Promise<APIResponse> {
    return this.delete(API_ENDPOINTS.PRODUCT_BY_ID(id));
  }
}
