import { test } from '@core';
import { waitUntilOfflineCacheStabilizes } from '@commands';
import { PatientRegistrationFormValues, PatientRegistrationPage, OfflineActionsPage } from '@pages';
import { expect } from '@playwright/test';

test('can register, synchronize and access a new patient while offline', async ({ loginAsAdmin: page, api }) => {
  const patientRegistrationPage = new PatientRegistrationPage(page);
  const offlineActionsPage = new OfflineActionsPage(page);
  const formValues: PatientRegistrationFormValues = {
    givenName: 'Johnny',
    middleName: 'Donny',
    familyName: 'Ronny',
    sex: 'male',
    birthdate: '1/1/2000',
  };

  await waitUntilOfflineCacheStabilizes(page);
  await page.context().setOffline(true);
  await patientRegistrationPage.goto();
  await patientRegistrationPage.submit(formValues);

  const newPatientUuid = /patient\/(.+)\/chart/.exec(page.url())?.[1] ?? '';

  await page.context().setOffline(false);
  await offlineActionsPage.goto();
  await offlineActionsPage.sync();

  const newPatientRes = await api.get(`rest/v1/patient/${newPatientUuid}`);
  await expect(newPatientRes.ok()).toBeTruthy();
});
