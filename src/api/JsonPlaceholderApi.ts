import { APIResponse } from '@playwright/test';
import { BaseApi } from './BaseApi';

export interface CreatePostPayload {
  title: string;
  body: string;
  userId: number;
}

/**
 * Lớp JsonPlaceholderApi xử lý các cuộc gọi API đến dịch vụ giả lập JSONPlaceholder.
 * Dùng để minh họa cách kiểm thử API GET và POST thực tế không cần API Key.
 */
export class JsonPlaceholderApi extends BaseApi {
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com/posts';

  /**
   * Lấy danh sách bài viết (GET)
   */
  async getPosts(): Promise<APIResponse> {
    return this.get(this.baseUrl);
  }

  /**
   * Lấy chi tiết bài viết theo ID (GET)
   * @param id Mã bài viết
   */
  async getPostById(id: number): Promise<APIResponse> {
    return this.get(`${this.baseUrl}/${id}`);
  }

  /**
   * Tạo bài viết mới (POST)
   * @param postData Thông tin bài viết
   */
  async createPost(postData: CreatePostPayload): Promise<APIResponse> {
    return this.post(this.baseUrl, postData);
  }
}
