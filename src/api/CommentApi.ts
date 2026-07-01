import { APIResponse } from '@playwright/test';
import { BaseApi } from './BaseApi';
import { API_ENDPOINTS } from '../constants/ApiEndpoint';

/**
 * Lớp CommentApi xử lý các cuộc gọi API liên quan đến Bình luận (Comments).
 * Kế thừa từ BaseApi để sử dụng các phương thức gọi HTTP (get, post) có sẵn.
 */
export class CommentApi extends BaseApi {

    /**
     * Lấy danh sách toàn bộ bình luận (GET)
     */
    async getComments(): Promise<APIResponse> {
        return this.get(API_ENDPOINTS.COMMENTS);
    }

    /**
     * Tạo bình luận mới (POST)
     * @param commentData Thông tin bình luận bao gồm: name, email, body, postId
     */
    async createComment(commentData: any): Promise<APIResponse> {
        return this.post(API_ENDPOINTS.COMMENTS, commentData);
    }
}
