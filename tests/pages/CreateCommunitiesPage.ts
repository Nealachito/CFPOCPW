import { Page, Locator } from '@playwright/test';
import { waitUntilImportProcessed } from '../helpers/importHelpers';

export class CommunitiesCreatePage {

    readonly page: Page;

    // STEP 1 locators
    readonly nameInput: Locator;
    readonly publicNameInput: Locator;
    readonly publicEmailInput: Locator;
    readonly locationInput: Locator;
    readonly saveBtn: Locator;

    constructor(page: Page) {
        this.page = page;

        this.nameInput = page.getByRole('textbox', { name: 'Nombre', exact: true });

        this.publicNameInput = page.getByRole('textbox', { name: 'Nombre público de la' });

        this.publicEmailInput = page.getByRole('textbox', { name: 'Correo electrónico público' });

        this.locationInput = page.getByRole('textbox', { name: 'Enter a location' });

        this.saveBtn = page.getByRole('button', { name: 'Guardar' });
    }

    // 👇 importante: esperar que realmente cargue el step 1
    async waitStep1Loaded() {
        await this.nameInput.waitFor({ state: 'visible' });
    }

    async fillStep1(data: { name: string; email: string; location: string; }) {

        await this.nameInput.fill(data.name);
        await this.publicNameInput.fill(data.name);
        await this.publicEmailInput.fill(data.email);

        // autocomplete (aquí estaba el riesgo real)
        await this.locationInput.fill(data.location);

        // esperar opciones del autocomplete
        await this.page.getByText('SantiagoChile').nth(1).waitFor({
            state: 'visible'
        });

        await this.page.getByText('SantiagoChile').nth(1).click();

        await this.saveBtn.click();
    }

    async enableContactAndSetEmail(email: string) {

        await this.page.evaluate((emailValue) => {

            const checkbox = document.querySelector(
                '#account_account_contacts_attributes_0__destroy'
            );

            const emailInput = document.querySelector(
                '#account_account_contacts_attributes_0_email'
            );

            if (!checkbox || !emailInput) {
                throw new Error('Elementos no encontrados');
            }

            // activar contacto
            (checkbox as HTMLInputElement).checked = true;

            checkbox.dispatchEvent(new Event('input', { bubbles: true }));
            checkbox.dispatchEvent(new Event('change', { bubbles: true }));

            // habilitar input
            emailInput.removeAttribute('disabled');

            (emailInput as HTMLInputElement).value = emailValue;
            emailInput.dispatchEvent(new Event('input', { bubbles: true }));

        }, email);

    }

    async saveAndGoToPermissions() {
        await this.page.getByRole('button', { name: 'Guardar' }).click();

        await this.page.locator(
            'a[href="/admin/self_granted_permissions"]'
        ).click();

        await this.page.waitForLoadState('networkidle');
    }

    async uploadExcel(filePath: string) {

        const fileInput = this.page.locator(
            '[data-file-input-target="fileInput"]'
        );

        await this.page.waitForFunction(() => {
            const el = document.querySelector(
                '[data-file-input-target="fileInput"]'
            );
            return el && !el.hasAttribute('disabled');
        });

        await fileInput.setInputFiles(filePath);

        await this.page.getByRole('button', { name: 'Subir' }).click();
        await this.page.getByRole('button', { name: 'Siguiente' }).click();

        await waitUntilImportProcessed(this.page);

        await this.page.waitForLoadState('networkidle');
    }

    async selectImportType(type: string) {

        const selector = this.page.locator(
            '[data-cf-selector-target="dropdown"]'
        );

        await selector.locator('#cf-selector-button').click();

        await selector.locator(`[data-value="${type}"]`).click();
    }

    async assignAdministrator(password: string) {

        await this.page
            .getByRole('textbox', { name: 'Contraseña', exact: true })
            .fill(password);

        await this.page
            .getByRole('textbox', { name: 'Confirmación de contraseña' })
            .fill(password);

        await this.page
            .getByRole('button', { name: 'Asignar Administrador' })
            .click();
    }
   
}