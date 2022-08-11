import { test } from '@core';
import { waitUntilOfflineCacheStabilizes } from '@commands';
import { expect } from '@playwright/test';
import { PatientChartPage, OfflineFormsPage, OfflineActionsPage } from '@pages';

test('can make a form offline available, fill it for an offline patient while offline and then synchronize it', async ({
  loginAsAdmin: page,
  newPatient,
}) => {
  const patientChartPage = new PatientChartPage(page);
  const offlineFormsPage = new OfflineFormsPage(page);
  const offlineActionsPage = new OfflineActionsPage(page);

  await patientChartPage.goto(newPatient.uuid);
  await patientChartPage.addToOfflinePatientList();

  await offlineFormsPage.goto();
  await offlineFormsPage.formToggleButton('POC Covid lab').click(); // TODO: Don't hardcode the name.

  await waitUntilOfflineCacheStabilizes(page);
  await page.context().setOffline(true);

  await patientChartPage.goto(newPatient.uuid);
  await expect(page.locator('text=POC Covid lab').first()).toBeVisible(); // TODO: Don't hardcode the name.

  await page.locator('text=POC Covid lab').click();

  // TODO: Fill arbitrary form values. Ideally this is also configurable in the future.

  await page.locator('button', { hasText: 'Save and close' }).click();

  await offlineActionsPage.goto();
  await page.context().setOffline(false);
  await expect(page.locator('text=Offline visit')).toBeVisible();
  await expect(page.locator('text=Patient form')).toBeVisible();

  await offlineActionsPage.sync();
  await expect(page.locator('text=Offline visit')).not.toBeVisible();
  await expect(page.locator('text=Patient form')).not.toBeVisible();
  // TODO: Ideally have an API level verification that the form/encounter has successfully been created.
});
