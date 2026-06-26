import { APIRequestContext, APIResponse } from '@playwright/test';

export class LoginApi {
  constructor(private request: APIRequestContext) {}

  /**
   * Performs an API login request.
   * Note: Since SauceDemo is a front-end only site, this method serves as
   * an example pattern of how to do API login and session management in Playwright.
   * 
   * @param username Account username
   * @param password Account password
   */
  async login(username: string, password: string): Promise<APIResponse> {
    // In a real application, you would make an API request like:
    return this.request.post('/api/v1/login', {
      data: {
        username,
        password,
      },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Fetches user profile data after logging in (Example pattern)
   */
  async getUserProfile(token: string): Promise<APIResponse> {
    return this.request.get('/api/v1/user/profile', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }
}
