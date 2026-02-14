import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { CommunitiesCreatePage } from '../pages/CreateCommunitiesPage';


test('CC - Create normal community', async ({ page }, testInfo) => {
  testInfo.setTimeout(testInfo.timeout + 180000);

  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const createcommunitiesPage = new CommunitiesCreatePage(page);

  //Login
  await loginPage.goto();
  await loginPage.login('neal.deoro@comunidadfeliz.cl', 'Miadeoro070923.')
  //await loginPage.login('nealdeoro@comunidadfeliz.cl', 'hAkukZC8btJn_NvDEcLgjKMh')
  await dashboardPage.waitLoaded();

  //Ir a crear comunidades (Normal)
  await dashboardPage.goToCreateNormalCommunity()

  //primera pantalla
   
  await createcommunitiesPage.waitStep1Loaded();

  await createcommunitiesPage.fillStep1({
    name: 'CF-TestAutomation-120226',
    email: 'neal.deoro@comunidafeliz.cl',
    location: 'Santiago '
  });


  //Segunda pantalla
  await createcommunitiesPage.enableContactAndSetEmail(
    'ndeororehobots@gmail.com'
  );

  await createcommunitiesPage.saveAndGoToPermissions();

  await createcommunitiesPage.uploadExcel(
    'tests/files/Propiedades tipo Casa Funk.xlsx'
  );

  await page.reload({ waitUntil: 'networkidle' });

  await createcommunitiesPage.selectImportType('Saldos');

  await createcommunitiesPage.uploadExcel(
    'tests/files/Saldos Tipo Casa Funk.xlsx'
  );

  await createcommunitiesPage.assignAdministrator('Feliz21.123123');

});