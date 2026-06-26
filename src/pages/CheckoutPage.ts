import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  // Step One locators (Information)
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly postalCodeInput: Locator;
  private readonly continueButton: Locator;
  private readonly errorMessage: Locator;

  // Step Two locators (Overview)
  private readonly finishButton: Locator;
  private readonly summaryTotal: Locator;

  // Complete locators
  private readonly completeHeader: Locator;
  private readonly completeText: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.summaryTotal = page.locator('.summary_total_label');
    this.completeHeader = page.locator('.complete-header');
    this.completeText = page.locator('.complete-text');
  }

  /**
   * Fills checkout information and clicks continue
   */
  async fillInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  /**
   * Gets display error message (e.g. required field missing)
   */
  async getErrorMessage(): Promise<string> {
    return this.errorMessage.innerText();
  }

  /**
   * Gets the final summary price total text
   */
  async getSummaryTotalText(): Promise<string> {
    return this.summaryTotal.innerText();
  }

  /**
   * Clicks the Finish button to complete checkout
   */
  async clickFinish(): Promise<void> {
    await this.finishButton.click();
  }

  /**
   * Gets header text from checkout completion page
   */
  async getCompleteHeader(): Promise<string> {
    return this.completeHeader.innerText();
  }

  /**
   * Gets description body text from checkout completion page
   */
  async getCompleteText(): Promise<string> {
    return this.completeText.innerText();
  }
}
