import { test, expect, Page } from '@playwright/test';

export async function waitUntilImportProcessed(page: Page) {
  const spinner = page.locator('.fa-refresh.fa-spin');
  await page.reload()
  // 1️⃣ Esperar a que el spinner APAREZCA (el job arrancó)
  await spinner.waitFor({
    state: 'visible',
    timeout: 30000 // ajusta si el backend tarda en iniciar
  });

  // 2️⃣ Mientras exista el spinner → reload cada 10s
  let attempts = 0;
  const maxAttempts = 30; // 30 x 10s = 5 minutos máx

  while (await spinner.isVisible()) {

    if (attempts >= maxAttempts) {
      throw new Error('El import tardó demasiado');
    }

    await page.waitForTimeout(10000);

    await page.reload({
      waitUntil: 'networkidle'
    });

    attempts++;
  }

  // 3️⃣ Confirmación final
  await expect(spinner).toBeHidden();
}


test('CC - Create normal community', async ({ page }, testInfo) => {
  testInfo.setTimeout(testInfo.timeout + 180000);
  await page.goto('https://test3.comunidadfeliz.com/');
  await page.getByRole('textbox', { name: 'Correo electrónico' }).fill('neal.deoro@comunidadfeliz.cl');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('Miadeoro070923*');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();


  await page.locator('div').filter({ hasText: 'Nueva comunidad' }).nth(2).click();
  await page.locator('#new-community-sidebar').getByRole('listitem').filter({ hasText: 'Normal' }).click();
 

  //primera pantalla
  await page.getByRole('textbox', { name: 'Nombre', exact: true }).fill('CF-TestAutomation-120226'); 
  await page.getByRole('textbox', { name: 'Nombre público de la' }).fill('CF-TestAutomation-120226');
  await page.getByRole('textbox', { name: 'Correo electrónico público' }).fill('neal.deoro@comunidafeliz.cl');
  await page.getByRole('textbox', { name: 'Enter a location' }).fill('Santiago ');
  await page.getByText('SantiagoChile').nth(1).click();
  await page.getByRole('button', { name: 'Guardar' }).click();
  
 
  //Segunda pantalla
 await page.evaluate(() => {

    const checkbox = document.querySelector('#account_account_contacts_attributes_0__destroy') as HTMLInputElement | null;

    const emailInput = document.querySelector('#account_account_contacts_attributes_0_email') as HTMLInputElement | null;

    if (!checkbox || !emailInput) {
      throw new Error('Elementos no encontrados');
    }

    // marcar checkbox
    checkbox.checked = true;

    // eventos que espera Stimulus
    checkbox.dispatchEvent(new Event('input', { bubbles: true }));
    checkbox.dispatchEvent(new Event('change', { bubbles: true }));

    // habilitar input
    emailInput.removeAttribute('disabled');
  });

  //await page.locator('#account_account_contacts_attributes_0__destroy').check({ force: true });

  await page.locator('#account_account_contacts_attributes_0_email').fill('ndeororehobots@gmail.com');
  await page.getByRole('button', { name: 'Guardar' }).click();
  
  await page.locator('a[href="/admin/self_granted_permissions"]').click();

  // espera a que backend termine
  await page.waitForLoadState('networkidle');

  // ahora sí refresh
  //await page.reload({ waitUntil: 'domcontentloaded' });

  //await page.reload();

  const fileInput = page.locator('[data-file-input-target="fileInput"]');

  await page.waitForFunction(() => {
    const el = document.querySelector(
      '[data-file-input-target="fileInput"]'
    );
    return el && !el.hasAttribute('disabled');
  });
  await fileInput.setInputFiles('tests/files/Propiedades tipo Casa Funk.xlsx');

  //await page.setInputFiles('#file','tests/files/Propiedades tipo Casa Funk.xlsx');
  //await page.getByRole('checkbox', { name: 'Archivo Excel' }).check();
  //await page.getByText('Archivo Excel').nth(1).click();
  await page.getByRole('button', { name: 'Subir' }).click();

  await page.getByRole('button', { name: 'Siguiente' }).click();
  
  //await waitUntilImportProcessed(page);
  await page.waitForResponse(resp =>
  resp.url().includes('/imports') &&
  resp.status() === 200
);

  
  const selector = page.locator('[data-cf-selector-target="dropdown"]');

  await selector.locator('#cf-selector-button').click();
  await selector.locator('[data-value="Saldos"]').click();

  
  await fileInput.setInputFiles('tests/files/Saldos Tipo Casa Funk.xlsx');
  
  await page.getByRole('button', { name: 'Subir' }).click();
  await page.getByRole('button', { name: 'Siguiente' }).click();

    await waitUntilImportProcessed(page);
 
  await page.getByRole('textbox', { name: 'Contraseña', exact: true }).fill('Feliz21.123123');
  
  await page.getByRole('textbox', { name: 'Confirmación de contraseña' }).fill('Feliz21.123123');
  await page.getByRole('button', { name: 'Asignar Administrador' }).click();
  
});