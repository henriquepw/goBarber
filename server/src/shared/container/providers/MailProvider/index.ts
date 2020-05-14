import { container } from 'tsyringe';

import mailConfig from '@config/mail';

import IMailProvider from './models/IMailProvider';

import EtherealMailProvider from './implementations/EtherealMailProvider';
import MailgunMailProvider from './implementations/MailgunMailProvider';

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  mailgun: container.resolve(MailgunMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
);
