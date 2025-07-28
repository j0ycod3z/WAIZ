const IS_PROD = process.env.NODE_ENV === 'production';

// Default (Development)
// let GRAPH_URL = "http://localhost:8000/graphql";
// let API_URL = "http://localhost:8000/api";
// let APP_URL = "http://localhost:3000";

// Default (Development)
let domain = '3.1.79.109';
let GRAPH_URL = `http://${domain}:8000/graphql`;
let API_URL = `http://${domain}:8000/api`;
let APP_URL = `http://${domain}:8000`;
let GA_KEY = "UA-000000000-0";
let CHATBOT = "https://y722zxgrdj.execute-api.ap-southeast-1.amazonaws.com/dev/waiz_chat";

// Production
if (IS_PROD) {
  GRAPH_URL = "https://wapi.waiz.cloud/graphql";
  API_URL = "https://wapi.waiz.cloud/api";
  APP_URL = "https://app.waiz.ai";
  GA_KEY = "UA-000000000-0";
}

module.exports = { GRAPH_URL, API_URL, APP_URL, GA_KEY, IS_PROD, CHATBOT };