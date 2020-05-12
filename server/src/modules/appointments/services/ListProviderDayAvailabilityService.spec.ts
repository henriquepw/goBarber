import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;

let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the day availability from provider', async () => {
    await Promise.all([
      fakeAppointmentsRepository.create({
        providerId: 'provider-id',
        date: new Date(2020, 4, 22, 14, 0, 0),
      }),
      fakeAppointmentsRepository.create({
        providerId: 'provider-id',
        date: new Date(2020, 4, 22, 15, 0, 0),
      }),
    ]);

    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 22, 11).getTime();
    });

    const availability = await listProviderDayAvailability.execute({
      providerId: 'provider-id',
      year: 2020,
      month: 5,
      day: 22,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 10, available: false },
        { hour: 12, available: true },
        { hour: 13, available: true },
        { hour: 14, available: false },
        { hour: 15, available: false },
      ]),
    );
  });
});
