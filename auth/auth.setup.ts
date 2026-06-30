import { test as setup } from '@playwright/test';
import { USERS } from '../src/data/users';

const authDir = 'playwright/.auth';

setup('authenticate as standard user', async ({ page }) => {
  await page.goto('/');
  await page.locator('#user-name').fill(USERS.standard.username);
  await page.locator('#password').fill(USERS.standard.password);
  await page.locator('#login-button').click();

  // Đợi cho đến khi chuyển hướng thành công đến trang sản phẩm
  await page.waitForURL('**/inventory.html');

  await page.context().storageState({ path: `${authDir}/standard.json` });
});

setup('authenticate as admin user', async ({ page }) => {
  await page.goto('/');
  await page.locator('#user-name').fill(USERS.admin.username);
  await page.locator('#password').fill(USERS.admin.password);
  await page.locator('#login-button').click();

  await page.waitForURL('**/inventory.html');

  await page.context().storageState({ path: `${authDir}/admin.json` });
});

setup('authenticate as problem user', async ({ page }) => {
  await page.goto('/');
  await page.locator('#user-name').fill(USERS.problem.username);
  await page.locator('#password').fill(USERS.problem.password);
  await page.locator('#login-button').click();

  await page.waitForURL('**/inventory.html');

  await page.context().storageState({ path: `${authDir}/problem.json` });
});
