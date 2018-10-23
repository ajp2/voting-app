module.exports = {
  mongodb: {
    dbURI: process.env.MONGODB_URI
  },
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  },
  session: {
    cookieKey: process.env.COOKIE_KEY
  }
};
