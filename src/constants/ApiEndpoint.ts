/**
 * Quản lý tập trung toàn bộ đường dẫn API (endpoints) của hệ thống.
 * Giúp dễ dàng bảo trì khi Backend thay đổi API version hoặc cấu trúc URL.
 */
export const API_ENDPOINTS = {
  // Xác thực (Auth)
  LOGIN: '/api/v1/auth/login',
  LOGOUT: '/api/v1/auth/logout',
  REFRESH_TOKEN: '/api/v1/auth/refresh',

  // Sản phẩm (Products)
  PRODUCTS: '/api/v1/products',
  PRODUCT_BY_ID: (id: string | number) => `/api/v1/products/${id}`,

  // Giỏ hàng (Cart)
  CART: '/api/v1/cart',

  // Người dùng (Profile)
  PROFILE: '/api/v1/user/profile',

  // Mock API (Dùng cho kiểm thử kiến trúc BaseApi)
  MOCK_GET: 'https://httpbingo.org/get',
  MOCK_POST: 'https://httpbingo.org/post',
  MOCK_BEARER: 'https://httpbingo.org/bearer',

  // Bình luận (Comments - JSONPlaceholder)
  COMMENTS: 'https://jsonplaceholder.typicode.com/comments',
  COMMENT_BY_ID: (id: string | number) => `https://jsonplaceholder.typicode.com/comments/${id}`,

  // Bài viết (Posts - JSONPlaceholder)
  POSTS: 'https://jsonplaceholder.typicode.com/posts',
} as const;
