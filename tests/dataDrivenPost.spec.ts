import { test, expect } from '../src/fixtures/apiFixture';
import postsTestData from '../src/data/postsTestData.json';

// Tắt cookie đăng nhập tự động của Saucedemo
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Lesson 16.6: Data Driven Testing for Posts (JSON)', () => {

    // Vòng lặp tự động duyệt qua từng bộ dữ liệu trong file JSON
    for (const data of postsTestData) {

        test(`should successfully create post with title: "${data.title}"`, async ({ jsonPlaceholderApi }) => {
            // 1. Gửi request POST tạo bài viết sử dụng dữ liệu từ JSON
            const response = await jsonPlaceholderApi.createPost(data);

            // 2. Kiểm tra status code (201 Created)
            expect(response.status()).toBe(201);

            // 3. Đọc dữ liệu trả về từ server
            const json = await response.json();

            // 4. Assert xác thực dữ liệu phản hồi khớp 100% với dữ liệu từ JSON
            expect(json.title).toBe(data.title);
            expect(json.body).toBe(data.body);
            expect(json.userId).toBe(data.userId);
            expect(json).toHaveProperty('id');
        });

    }

});
