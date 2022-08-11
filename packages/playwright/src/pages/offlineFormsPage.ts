import { Page } from '@playwright/test';

export class OfflineFormsPage {
  constructor(readonly page: Page) {}

  readonly formToggleButton = (formName: string) =>
    this.page.locator('tr', { hasText: formName }).locator('label[aria-label="Toggle"]');

  async goto() {
    await this.page.goto('offline-tools/forms');
  }
}
