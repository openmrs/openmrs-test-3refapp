import { test } from '@core';
import { waitUntilOfflineCacheStabilizes } from '@commands';
import { expect } from '@playwright/test';
import { PatientChartPage, OfflinePatientsPage } from '@pages';

test('can synchronize an offline patient and access the patient chart while offline', async ({
  loginAsAdmin: page,
  newPatient,
}) => {
  const patientName = newPatient.person.preferredName.display;
  const patientChartPage = new PatientChartPage(page);
  const offlinePatientsPage = new OfflinePatientsPage(page);

  await patientChartPage.goto(newPatient.uuid);
  await patientChartPage.addToOfflinePatientList();

  await offlinePatientsPage.goto();
  await expect(offlinePatientsPage.patientRow(patientName)).toBeVisible();

  await waitUntilOfflineCacheStabilizes(page);
  await page.context().setOffline(true);

  await patientChartPage.goto(newPatient.uuid);
  await expect(page.locator(`text=${patientName}`).first()).toBeVisible();
});
