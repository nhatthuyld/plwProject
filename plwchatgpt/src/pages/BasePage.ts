import { Page } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  /**
   * Navigates to a path relative to the baseURL
   * @param path Target path
   */
  async navigate(path: string): Promise<void> {
    await this.page.goto(path);
  }

  /**
   * Gets the current URL of the page
   */
  async getUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Gets the page title
   */
  async getTitle(): Promise<string> {
    return this.page.title();
  }

  /**
   * Reloads the current page
   */
  async reload(): Promise<void> {
    await this.page.reload();
  }
}
