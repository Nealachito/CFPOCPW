import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  //await page.goto('https://test3.comunidadfeliz.com/');
 
  //await page.getByRole('textbox', { name: 'Correo electrónico' }).fill('neal.deoro@comunidadfeliz.cl');
  
  //await page.getByRole('textbox', { name: 'Contraseña' }).fill('Miadeoro070923*');
  //await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  
  //await page.locator('div').filter({ hasText: 'Nueva comunidad' }).nth(2).click();
  //await page.getByRole('link', { name: ' Normal' }).click();
  
 /*
  await page.getByRole('textbox', { name: 'Nombre', exact: true }).fill('CF-TestAutomation-130226');
  await page.getByRole('textbox', { name: 'Nombre público de la' }).fill('CF-TestAutomation-130226');
  await page.getByRole('textbox', { name: 'Correo electrónico público' }).click();
  await page.getByRole('textbox', { name: 'Correo electrónico público' }).fill('neal.deoro@comunidafeliz.cl');
  await page.getByRole('textbox', { name: 'Enter a location' }).click();
  await page.getByRole('textbox', { name: 'Enter a location' }).fill('santiago');
  await page.getByText('SantiagoChile').nth(1).click();
  await page.getByRole('button', { name: 'Guardar' }).click();
*/
  //await page.getByRole('checkbox', { name: 'Correo de contacto principal' }).check();
  /*
  await page.locator('#account_account_contacts_attributes_0_email').fill('neal.deoro@comunidafeliz.cl');
  await page.getByRole('button', { name: 'Guardar' }).click();
  */
 
  await page.getByRole('link').nth(3).click();
  await page.getByText('Examinar').click();
  await page.getByText('Neal De Oro Academia Feliz Cerrar sesión Comunidades Soporte y operaciones').setInputFiles('Propiedades tipo Casa Funk.xlsx');
  await page.getByRole('button', { name: 'Subir' }).click();
  await page.getByRole('button', { name: 'Siguiente' }).click();
  await page.getByRole('button', { name: 'Copropietarios ' }).click();
  await page.getByText('Saldos').click();
  await page.getByText('Examinar').click();
  await page.getByText('Neal De Oro Academia Feliz Cerrar sesión Comunidades Soporte y operaciones').setInputFiles('Saldos Tipo Casa Funk.xlsx');
  await page.getByRole('button', { name: 'Subir' }).click();
  await page.getByRole('button', { name: 'Siguiente' }).click();
  await page.getByRole('textbox', { name: 'Contraseña', exact: true }).click();
  await page.getByRole('textbox', { name: 'Contraseña', exact: true }).fill('Feliz21.123123');
  await page.getByRole('textbox', { name: 'Confirmación de contraseña' }).click();
  await page.getByRole('textbox', { name: 'Confirmación de contraseña' }).fill('Feliz21.123123');
  await page.getByRole('button', { name: 'Asignar Administrador' }).click();
  await page.getByText('Administrador ingresado').click();
  await page.getByRole('link', { name: 'Entrar a comunidad' }).click();

});