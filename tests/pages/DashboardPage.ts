import { Locator, Page, expect } from '@playwright/test';

export class DashboardPage {
    readonly page: Page;
    readonly opNewCommunity: Locator;
    readonly subOpNormalCommunity: Locator;
    readonly communitiesLink: Locator;


    constructor(page: Page) {
        this.page = page;
        this.opNewCommunity = page.locator('div').filter({ hasText: 'Nueva comunidad' }).nth(2);
        this.subOpNormalCommunity = page.locator('#new-community-sidebar').getByRole('listitem').filter({ hasText: 'Normal' });
        this.communitiesLink = this.page.locator('#superadmin-communities');
    }

    //localizadores

    // Espera básica a que el dashboard esté listo
    async waitLoaded() {
        // 1️⃣ esperar navegación real al dashboard
        await expect(this.page).toHaveURL(/admin/i);

        // 2️⃣ assertion REAL del sistema
        await expect(
            this.page.getByText('ADMIN DASHBOARD', { exact: false })
        ).toBeVisible();
    }

    // ===== NAVBAR MODULES =====

    async goToCommunities() {
        await this.communitiesLink.click()
    }

    async goToCreateNormalCommunity() {
        await this.opNewCommunity.click();
        await this.subOpNormalCommunity.click();
    }

    async goToResidents() {
        await this.page
            .getByRole('link', { name: /Residentes/i })
            .click();
    }

    async goToSettings() {
        await this.page
            .getByRole('link', { name: /Configuración/i })
            .click();
    }
}
