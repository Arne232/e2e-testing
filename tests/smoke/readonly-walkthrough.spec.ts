import { test } from '@playwright/test';
import { LoginPage as AdminUILoginPage } from '../../src/pages/admin-ui';
import { LoginPage as UILoginPage } from '../../src/pages/ui';
import { AuthResource } from '../../src/resources/gargantua';

test('Admin UI walkthrough readonly smoke test', async ({ page }) => {
  let loginPage = new AdminUILoginPage(page);
  await loginPage.goto(process.env.HOBBYFARM_ADMIN_UI_URL as string);
  let homePage = await loginPage.fillCredentialsAndSubmit(process.env.HOBBYFARM_ADMIN_UI_USR as string, process.env.HOBBYFARM_ADMIN_UI_PWD as string);
  await homePage.displayAboutModal();
  await homePage.displayLogoutModal();
  homePage = await homePage.openHomePage();
  const dashboardPage = await homePage.openDashboardPage();
  const scheduledEventPage = await dashboardPage.openScheduledEventPage();
  const contentManagementPage = await scheduledEventPage.openContentManagementPage();
  const userPage = await contentManagementPage.openUserPage();
  const configurationPage = await userPage.openConfigurationPage();
  await configurationPage.openNewEnvironmentModal();
  await configurationPage.cancelModal();
  loginPage = await configurationPage.logout();
});

test('UI walkthrough readonly smoke test', async ({ page }) => {
  let loginPage = new UILoginPage(page);
  await loginPage.goto(process.env.HOBBYFARM_UI_URL as string);
  const homePage = await loginPage.fillCredentialsAndSubmit(process.env.HOBBYFARM_UI_HEADER_TITLE as string, process.env.HOBBYFARM_ADMIN_UI_USR as string, process.env.HOBBYFARM_ADMIN_UI_PWD as string);
  await homePage.displayAboutModal();
  await homePage.displayLogoutModal();
  await homePage.openHomePage();
  loginPage = await homePage.logout();
});

test('Gargantua walkthrough readonly smoke test', async ({ request }) => {
  const authResource = new AuthResource(request, process.env.HOBBYFARM_GARGANTUA_URL as string);
  await authResource.login(process.env.HOBBYFARM_ADMIN_UI_USR as string, process.env.HOBBYFARM_ADMIN_UI_PWD as string);
});
