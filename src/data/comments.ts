/**
 * Quản lý tập trung dữ liệu kiểm thử cho các API liên quan đến Bình luận (Comments).
 * Tách biệt dữ liệu kiểm thử giúp test spec dễ đọc và bảo trì hơn.
 */
export const COMMENT_DATA = {
    createPayload: {
        postId: 1,
        name: 'Nguyễn Văn B',
        email: 'vanb@example.com',
        body: 'Đây là nội dung bình luận tự động bằng Playwright API.',
    },
} as const;
