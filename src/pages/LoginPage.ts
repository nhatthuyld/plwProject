import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { URLS } from '../constants/Url';

export class LoginPage extends BasePage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    // Best practice: Use data-test locators where possible
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  /**
   * Navigates directly to the login page
   */
  async navigateTo(): Promise<void> {
    await this.navigate(URLS.home);
  }

  /**
   * Performs the login action
   * @param username Account username
   * @param password Account password
   */
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Gets the display text of the login error container
   */
  async getErrorMessage(): Promise<string> {
    return this.errorMessage.innerText();
  }

  /**
   * Checks if login error message is visible
   */
  async isErrorMessageDisplayed(): Promise<boolean> {
    return this.errorMessage.isVisible();
  }
}
