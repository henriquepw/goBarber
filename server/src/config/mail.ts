interface IMailConfig {
  driver: 'ethereal' | 'mailgun';
  defauts: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defauts: {
    from: {
      email: process.env.MAIL,
      name: process.env.MAIL_NAME,
    },
  },
} as IMailConfig;
