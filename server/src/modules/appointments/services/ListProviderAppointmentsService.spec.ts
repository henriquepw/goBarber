import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;

let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the appointments on a specific day', async () => {
    const appointments = await Promise.all([
      fakeAppointmentsRepository.create({
        providerId: 'provider-id',
        userId: 'user-id',
        date: new Date(2020, 4, 22, 14, 0, 0),
      }),
      fakeAppointmentsRepository.create({
        providerId: 'provider-id',
        userId: 'user-id',
        date: new Date(2020, 4, 22, 15, 0, 0),
      }),
    ]);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 22, 11).getTime();
    });

    const availability = await listProviderAppointments.execute({
      providerId: 'provider-id',
      year: 2020,
      month: 5,
      day: 22,
    });

    expect(availability).toEqual(appointments);
  });
});
