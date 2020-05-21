const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  endpoint: process.env.REACT_APP_API_ENDPOINT,
  clientEndpoint: process.env.REACT_APP_CLIENT_ENDPOINT,
  secretKey: process.env.REACT_APP_ENCRYPTION_SECRET,
  socketEndpoint: process.env.REACT_APP_SOCKET_ENDPOINT,
};
