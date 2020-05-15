export default {
  jwt: {
    secret: process.env.APP_SEGRET || 'default-secret',
    expiresIn: process.env.AUTH_EXPIRES_IN ?? '1d',
  },
};
