import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { CommunitiesPage } from '../pages/CommunitiesPage';

test('Deactivate Community', async ({ page }, testInfo) => {
  testInfo.setTimeout(testInfo.timeout + 180000);


  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const communitiesPage = new CommunitiesPage(page);

  await loginPage.goto();

  //Login

  await loginPage.login('nealdeorosa@comunidadfeliz.com', 'iZQwzTay}AnAc7HFN5VWCViA')
  await dashboardPage.waitLoaded();

  //Ir a comunidades 
  await dashboardPage.goToCommunities();
  await communitiesPage.waitLoaded();


  //Desactivar comunidad
  const m = 2
  for (let n = 0; n < m; n++) {
    await communitiesPage.searchCommunity('CF-TestAutomation-120226');
    await communitiesPage.openDeactivateModal();
    await communitiesPage.selectReason('Cambio de Administración');
    await communitiesPage.enableImmediateDeactivation();
    await communitiesPage.confirmDeactivation();
  }

});