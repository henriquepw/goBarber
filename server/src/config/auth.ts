export default {
  jwt: {
    secret: process.env.APP_SEGRET,
    expiresIn: process.env.AUTH_EXPIRES_IN,
  },
};
