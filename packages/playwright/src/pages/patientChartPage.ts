import { Page } from '@playwright/test';

export class PatientChartPage {
  constructor(readonly page: Page) {}

  readonly actionsMenuButton = () => this.page.locator('#custom-actions-overflow-menu-trigger');
  readonly actionsMenuAddToListButton = () => this.page.locator('text=Add to list');
  readonly filterPatientListsInput = () => this.page.locator('input[placeholder="Filter list"]');
  readonly offlinePatientsCheckBox = () => this.page.locator('text=Offline patients');
  readonly addToListButton = () => this.page.locator('.bx--modal-container button >> :scope:has-text("Add to list")');

  async goto(patientUuid: string) {
    await this.page.goto(`patient/${patientUuid}/chart`);
  }

  async addToOfflinePatientList() {
    await this.actionsMenuButton().click();
    await this.actionsMenuAddToListButton().click();
    await this.filterPatientListsInput().fill('Offline patients');
    await this.offlinePatientsCheckBox().check();
    await this.addToListButton().click();
  }
}