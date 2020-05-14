import nodemailer, { Transporter } from 'nodemailer';
import nodemailMailgun from 'nodemailer-mailgun-transport';
import { inject, injectable } from 'tsyringe';

import mailConfig from '@config/mail';

import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';

import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';

@injectable()
class MailgunMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    this.client = nodemailer.createTransport(
      nodemailMailgun({
        auth: {
          // eslint-disable-next-line @typescript-eslint/camelcase
          api_key: process.env.MAIL_API_KEY as string,
          domain: process.env.MAIL_API_DOMAIN,
        },
      }),
    );
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const { name, email } = mailConfig.defauts.from;

    const html = await this.mailTemplateProvider.parse(templateData);

    await this.client.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html,
    });
  }
}

export default MailgunMailProvider;
