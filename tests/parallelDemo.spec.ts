import { test } from '@playwright/test';

test.describe('Lesson 18: Parallel Execution Demonstration', () => {

  test('Test Case 1 - Chờ 2 giây', async () => {
    const startTime = Date.now();
    console.log('👉 [Test 1] Bắt đầu lúc:', new Date().toLocaleTimeString());

    // Giả lập một tác vụ kiểm thử tốn 2 giây
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('✅ [Test 1] Kết thúc sau:', (Date.now() - startTime) / 1000, 'giây');
  });

  test('Test Case 2 - Chờ 2 giây', async () => {
    const startTime = Date.now();
    console.log('👉 [Test 2] Bắt đầu lúc:', new Date().toLocaleTimeString());

    // Giả lập một tác vụ kiểm thử tốn 2 giây
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('✅ [Test 2] Kết thúc sau:', (Date.now() - startTime) / 1000, 'giây');
  });

  test('Test Case 3 - Chờ 2 giây', async () => {
    const startTime = Date.now();
    console.log('👉 [Test 3] Bắt đầu lúc:', new Date().toLocaleTimeString());

    // Giả lập một tác vụ kiểm thử tốn 2 giây
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('✅ [Test 3] Kết thúc sau:', (Date.now() - startTime) / 1000, 'giây');
  });

});
