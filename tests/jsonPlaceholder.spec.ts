import { test, expect } from '../src/fixtures/apiFixture';

// Cấu hình không sử dụng storageState mặc định để tránh gửi kèm cookie/session của Saucedemo
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('JSONPlaceholder API Testing (GET & POST)', () => {
  
  test('should successfully retrieve list of posts (GET)', async ({ jsonPlaceholderApi }) => {
    // 1. Gửi request GET thông qua wrapper class
    const response = await jsonPlaceholderApi.getPosts();
    
    // 2. Kiểm tra status code (200 OK)
    expect(response.ok()).toBe(true);
    expect(response.status()).toBe(200);

    // 3. Đọc dữ liệu JSON trả về
    const json = await response.json();
    
    // 4. Kiểm tra cấu trúc dữ liệu trả về (Assertion)
    expect(Array.isArray(json)).toBe(true);
    expect(json.length).toBeGreaterThan(0);

    // Kiểm tra thông tin của bài viết đầu tiên
    const firstPost = json[0];
    expect(firstPost).toHaveProperty('id');
    expect(firstPost).toHaveProperty('title');
    expect(firstPost).toHaveProperty('body');
    expect(firstPost).toHaveProperty('userId');
  });

  test('should successfully retrieve single post by ID (GET)', async ({ jsonPlaceholderApi }) => {
    const postId = 1;
    const response = await jsonPlaceholderApi.getPostById(postId);

    expect(response.ok()).toBe(true);
    expect(response.status()).toBe(200);

    const json = await response.json();
    expect(json.id).toBe(postId);
    expect(json).toHaveProperty('title');
    expect(json).toHaveProperty('body');
  });

  test('should successfully create a new post (POST)', async ({ jsonPlaceholderApi }) => {
    const payload = {
      title: 'Tự động hóa kiểm thử',
      body: 'Hướng dẫn viết API test với Playwright TypeScript',
      userId: 1,
    };

    // 1. Gửi request POST tạo dữ liệu mới
    const response = await jsonPlaceholderApi.createPost(payload);

    // 2. Kiểm tra status code (201 Created)
    expect(response.status()).toBe(201);

    // 3. Đọc và kiểm tra thông tin trả về từ Server
    const json = await response.json();
    expect(json.title).toBe(payload.title);
    expect(json.body).toBe(payload.body);
    expect(json.userId).toBe(payload.userId);
    expect(json).toHaveProperty('id'); // ID bài viết mới tạo
  });
});
