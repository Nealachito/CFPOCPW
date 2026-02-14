import { Page, Locator } from '@playwright/test';

export class CommunitiesPage {

  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchBtn: Locator;
  readonly deactivateBtn: Locator;
  readonly reasonDropdown: Locator;
  readonly saveBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.searchInput = page.getByRole('textbox', {
      name: 'Parámetros de búsqueda'
    });

    this.searchBtn = page.getByRole('button', { name: 'Buscar' });

    this.deactivateBtn = page.locator(
      '(//*[@data-original-title="Desactivar"])[1]'
    );

    this.reasonDropdown = page.getByText('Ninguna razón seleccionada');

    this.saveBtn = page.getByRole('button', { name: 'Guardar' });
  }

    async waitLoaded() {
        await this.page.waitForURL('**/admin/communities');
        await this.searchInput.waitFor({state: 'visible' });
    }

  async searchCommunity(name: string) {
    await this.searchInput.fill(name);
    await this.searchBtn.click();
  }

  async openDeactivateModal() {
    await this.deactivateBtn.waitFor({ state: 'visible' });
    await this.deactivateBtn.click();
  }

  async selectReason(reason: string) {
    await this.reasonDropdown.waitFor({ state: 'visible' });
    await this.reasonDropdown.click();

    await this.page.getByText(reason).click();
  }

  async enableImmediateDeactivation() {
    await this.page.evaluate(() => {
      const checkbox =
        document.querySelector(
          '#leaving_community_immediate_deactivation'
        ) as HTMLInputElement | null;

      if (!checkbox) throw new Error('Checkbox no encontrado');

      checkbox.checked = true;
      checkbox.dispatchEvent(new Event('change', { bubbles: true }));
    });
  }

  async confirmDeactivation() {
    await this.saveBtn.click();
  }
}