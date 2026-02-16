import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { LoginPage } from '../pages/LoginPage';

let basePage: BasePage;
let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  basePage = new BasePage(page);
  loginPage = new LoginPage(page);

  await basePage.open();
  await loginPage.gotoLoginPage();
  await loginPage.expectLoginPageUrlAndTitle();
});

test.skip(({ browserName }) => browserName === 'webkit', 'Skipping webkit on Windows');

test.describe('Login Saribekya Account', () => {

  test('Login with valid email and valid password', async ({ page }) => {
    await loginPage.login('saribekyan.sts@gmail.com', 'qqww1212');
    await loginPage.expectAccountPage();

    await loginPage.logout();
    await loginPage.expectLogout();

    await page.getByRole('link', { name: 'Continue' }).click();
    await basePage.expectHomePage();
  });

  test('Session persists after page refresh', async ({ page }) => {
    await loginPage.login('saribekya.sts@gmail.com', 'qqww1212');
    await loginPage.expectAccountPage();

    await page.reload();
    await loginPage.expectAccountPage();
  });

  // posible negative parms for login test.
  const negativeCredentials = [
    { email: '', password: '', description: 'Empty email and password' },
    { email: '', password: 'wrongpass1', description: 'Empty email and filled password' },
    { email: 'saribekya.sts@gmail.com', password: '', description: 'Filled email and empty password' },
    { email: 'saribekya.sts@gmail.com', password: 'short', description: 'Valid email and invalid password' },
    { email: 'invaliduser@gmail.com', password: 'qqww1212', description: 'Invalid email and valid password' },
    { email: 'invaliduser@gmail.com', password: 'badpass123', description: 'Invalid email and invalid password' },
    { email: 'saribekyasts.gmail.com', password: 'qqww1212', description: 'Invalid email format' },
    { email: '   saribekya.sts@gmail.com.  ', password: 'qqww1212', description: 'Email with leading and trailing spaces' },
  ];

  negativeCredentials.forEach(({ email, password, description }) => {
    test(`Negative login: ${description}`, async ({ page }) => {
      await loginPage.login(email, password);
      await loginPage.expectAlertErrorMessage();
    });
  });

});