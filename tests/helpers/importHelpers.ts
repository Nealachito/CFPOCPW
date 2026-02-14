import { Page } from '@playwright/test';

export async function waitUntilImportProcessed(page: Page) {

    const spinner = page.locator('.fa-refresh.fa-spin');
    const success = page.locator('.fa.fa-check');

    const MAX_TIME = 180000; // 3 min
    const INTERVAL = 4000;   // refresh cada 4s

    const start = Date.now();

    while (Date.now() - start < MAX_TIME) {

        // ✅ si ya terminó → salir
        if (await success.first().isVisible().catch(() => false)) {
            console.log('✅ Excel procesado');
            return;
        }

        // ⏳ esperar antes del refresh
        await page.waitForTimeout(INTERVAL);

        // 🔄 F5 real
        await page.reload({ waitUntil: 'domcontentloaded' });
    }

    throw new Error('❌ Timeout esperando procesamiento del Excel');
}