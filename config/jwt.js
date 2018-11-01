const env = process.env.NODE_ENV || "development";

const getSecretKey = () =>
  env === "production" ? process.env.JWT_SECRET_KEY : "bobsaget";

module.exports = getSecretKey();
