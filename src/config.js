const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  endpoint: process.env.REACT_APP_API_ENDPOINT,
};
