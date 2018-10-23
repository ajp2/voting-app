module.exports = {
  mongodb: {
    dbURI: process.env.DB_HOST
  },
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  },
  session: {
    cookieKey: COOKIE_KEY
  }
};
