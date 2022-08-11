import { expect, Page, TestFixture } from '@playwright/test';
import { CustomWorkerFixtures } from '@core';

/**
 * A fixture which creates a new patient that can be used by the test.
 *
 * The created patient can be used like this:
 * ```ts
 * test('your test', async ({ newPatient }) => {
 *   console.log(newPatient);
 * });
 * ```
 */
export const newPatient: TestFixture<Page, CustomWorkerFixtures> = async ({ api }, use) => {
  const identifierRes = await await api.post('rest/v1/idgen/identifiersource/8549f706-7e85-4c1d-9424-217d50a2988b/identifier', { data: {} })
  await expect(identifierRes.ok()).toBeTruthy();
  const { identifier } = await identifierRes.json();

  const patientRes = await api.post('rest/v1/patient', {
    // TODO: This is not configurable right now. It probably should be.
    data: {
      identifiers: [
        {
          identifier,
          identifierType: '05a29f94-c0ed-11e2-94be-8c13b969e334',
          location: '44c3efb0-2583-4c80-a79e-1f756a03c0a1',
          preferred: true,
        },
      ],
      person: {
        addresses: [
          {
            address1: 'Bom Jesus Street',
            address2: '',
            cityVillage: 'Recife',
            country: 'Brazil',
            postalCode: '50030-310',
            stateProvince: 'Pernambuco',
          },
        ],
        attributes: [],
        birthdate: '2020-2-1',
        birthdateEstimated: true,
        dead: false,
        gender: 'M',
        names: [
          {
            familyName: 'Smith',
            givenName: 'John',
            middleName: '',
            preferred: true,
          },
          {
            familyName: 'Smitty',
            givenName: 'Joey',
            middleName: '',
            preferred: false,
          },
        ],
      },
    },
  });
  await expect(patientRes.ok()).toBeTruthy();

  const patient = await patientRes.json();
  await use(patient);
};
