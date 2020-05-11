import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;

let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      providerId: 'provider-id',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      providerId: 'provider-id',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      providerId: 'provider-id',
      date: new Date(2020, 4, 21, 10, 0, 0),
    });

    const availability = await listProviderMonthAvailability.execute({
      providerId: 'provider-id',
      year: 2020,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 20, available: false },
        { day: 21, available: false },
        { day: 22, available: true },
        { day: 23, available: true },
      ]),
    );
  });
});
