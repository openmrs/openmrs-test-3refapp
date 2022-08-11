import { Page } from '@playwright/test';

export class OfflinePatientsPage {
  constructor(readonly page: Page) {}

  readonly patientRow = (patientName: string) => this.page.locator('tr', { hasText: patientName });

  async goto() {
    await this.page.goto('offline-tools/patients');
  }
}
