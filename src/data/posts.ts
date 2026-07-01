/**
 * Quản lý tập trung dữ liệu kiểm thử (Test Data) cho các API của JSONPlaceholder.
 * Tách biệt dữ liệu kiểm thử ra khỏi logic kiểm thử giúp code sạch và dễ bảo trì.
 */
export const POST_DATA = {
  createPayload1: {
    title: 'Tự động hóa kiểm thử',
    body: 'Hướng dẫn viết API test với Playwright TypeScript',
    userId: 1,
  },
  createPayload2: {
    title: 'Tự động hóa kiểm thử2',
    body: 'Hướng dẫn viết API test với Playwright TypeScript',
    userId: 1,
  },
  updatePayload: {
    title: 'Tiêu đề đã được cập nhật',
    body: 'Nội dung bài viết mới sau khi chỉnh sửa',
    userId: 1,
  },
} as const;
