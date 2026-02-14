import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://test3.comunidadfeliz.com/');
  }

  async login(email: string, password: string) {
    await this.page
      .getByRole('textbox', { name: 'Correo electrónico' })
      .fill(email);

    await this.page
      .getByRole('textbox', { name: 'Contraseña' })
      .fill(password);

    await this.page
      .getByRole('button', { name: 'Iniciar sesión' })
      .click();
  }
}
