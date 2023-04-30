const { TOKEN } = process.env;
const { SERVER_URL } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;
const URI = `/webhook/${TOKEN}`;
const WEBHOOK_URL = SERVER_URL + URI;

module.exports = {
  TOKEN,
  SERVER_URL,
  TELEGRAM_API,
  URI,
  WEBHOOK_URL,
};
