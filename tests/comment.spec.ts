import { test, expect } from '../src/fixtures/apiFixture';
import { COMMENT_DATA } from '../src/data/comments';

// Tắt cookie đăng nhập tự động của Saucedemo
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('JSONPlaceholder Comments API Testing (GET & POST)', () => {

    test('should successfully retrieve list of comments (GET)', async ({ commentApi }) => {
        // 1. Gửi request GET lấy danh sách bình luận
        const response = await commentApi.getComments();

        // 2. Assert status code 200 OK
        expect(response.ok()).toBe(true);
        expect(response.status()).toBe(200);

        // 3. Đọc dữ liệu JSON và kiểm tra kiểu mảng
        const json = await response.json();
        expect(Array.isArray(json)).toBe(true);
        expect(json.length).toBeGreaterThan(0);

        // 4. Kiểm tra các trường của bình luận đầu tiên
        const firstComment = json[0];
        expect(firstComment).toHaveProperty('id');
        expect(firstComment).toHaveProperty('postId');
        expect(firstComment).toHaveProperty('name');
        expect(firstComment).toHaveProperty('email');
        expect(firstComment).toHaveProperty('body');
    });

    test('should successfully create a new comment (POST)', async ({ commentApi }) => {
        const payload = COMMENT_DATA.createPayload;

        // 1. Gửi request POST tạo bình luận mới
        const response = await commentApi.createComment(payload);

        // 2. Assert status code 201 Created
        expect(response.status()).toBe(201);

        // 3. Đọc dữ liệu trả về và xác thực khớp với payload gửi đi
        const json = await response.json();
        expect(json.postId).toBe(payload.postId);
        expect(json.name).toBe(payload.name);
        expect(json.email).toBe(payload.email);
        expect(json.body).toBe(payload.body);
        expect(json).toHaveProperty('id'); // Phải có ID tự sinh
    });

});
