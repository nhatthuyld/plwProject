import { APIResponse } from '@playwright/test';
import { BaseApi } from './BaseApi';
import { API_ENDPOINTS } from '../constants/ApiEndpoint';
import { HEADERS } from '../constants/Header';

/**
 * Lớp LoginApi xử lý các tác vụ API liên quan đến xác thực tài khoản.
 * Kế thừa từ BaseApi để sử dụng các hàm HTTP có sẵn.
 */
export class LoginApi extends BaseApi {
  /**
   * Đăng nhập tài khoản bằng API.
   * 
   * @param username Tên đăng nhập.
   * @param password Mật khẩu.
   * @returns APIResponse.
   */
  async login(username: string, password: string): Promise<APIResponse> {
    return this.post(API_ENDPOINTS.LOGIN, {
      username,
      password,
    });
  }

  /**
   * Đăng xuất tài khoản bằng API.
   * Yêu cầu gửi kèm Token xác thực trong Header.
   * 
   * @param token Chuỗi Access Token hiện tại của tài khoản.
   * @returns APIResponse.
   */
  async logout(token: string): Promise<APIResponse> {
    return this.post(
      API_ENDPOINTS.LOGOUT,
      null, // Không cần gửi kèm body data
      HEADERS.getAuthHeader(token) // Đính kèm token vào header Authorization
    );
  }

  /**
   * Làm mới (Refresh) Session/Token để kéo dài thời gian đăng nhập của tài khoản.
   * Yêu cầu gửi kèm Token xác thực trong Header.
   * 
   * @param token Chuỗi Refresh/Access Token hiện tại.
   * @returns APIResponse.
   */
  async refreshToken(token: string): Promise<APIResponse> {
    return this.post(
      API_ENDPOINTS.REFRESH_TOKEN,
      null, // Không cần gửi kèm body data
      HEADERS.getAuthHeader(token) // Đính kèm token vào header Authorization
    );
  }
}
