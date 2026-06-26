import { test, expect } from '../src/fixtures/baseTest';
import { USERS } from '../src/data/users';
import { MESSAGES } from '../src/constants/Message';
import { URLS } from '../src/constants/Url';

test.describe('Login Tests', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateTo();
  });

  test('should login successfully with standard user', async ({ loginPage, productPage }) => {
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    
    // Assertion: URL changes to inventory
    const currentUrl = await productPage.getUrl();
    expect(currentUrl).toContain(URLS.inventory);

    // Assertion: Catalog page title is loaded
    const isLoaded = await productPage.isPageLoaded();
    expect(isLoaded).toBe(true);
  });

  test('should display error message for locked out user', async ({ loginPage }) => {
    await loginPage.login(USERS.lockedOut.username, USERS.lockedOut.password);
    
    const isDisplayed = await loginPage.isErrorMessageDisplayed();
    expect(isDisplayed).toBe(true);

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain(MESSAGES.login.lockedOutError);
  });

  test('should display error message for invalid credentials', async ({ loginPage }) => {
    await loginPage.login(USERS.invalid.username, USERS.invalid.password);
    
    const isDisplayed = await loginPage.isErrorMessageDisplayed();
    expect(isDisplayed).toBe(true);

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain(MESSAGES.login.invalidCredentialsError);
  });

  test('should display error message when username is empty', async ({ loginPage }) => {
    await loginPage.login('', USERS.standard.password);
    
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain(MESSAGES.login.requiredUsernameError);
  });

  test('should display error message when password is empty', async ({ loginPage }) => {
    await loginPage.login(USERS.standard.username, '');
    
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain(MESSAGES.login.requiredPasswordError);
  });
});
