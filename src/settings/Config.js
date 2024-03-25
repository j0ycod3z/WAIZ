const IS_PROD = process.env.NODE_ENV === 'production';

// Default (Development)

let GRAPH_URL = "http://54.169.63.155:8000/graphql";
let API_URL = "http://54.169.63.155:8000/api";

// let GRAPH_URL = "http://127.0.0.1:8000/graphql";
// let API_URL = "http://127.0.0.1:8000/api";
let APP_URL = "http://localhost:3000";
let GA_KEY = "UA-000000000-0";

// Production

if (IS_PROD) {
  // GRAPH_URL = "https://api.canou.io/graphql";
  // API_URL = "https://api.canou.io/api";
  let GRAPH_URL = "http://54.169.63.155:8000/graphql";
  let API_URL = "http://54.169.63.155:8000/api";
  APP_URL = "https://canou.io";
  GA_KEY = "UA-000000000-0";
}

export { GRAPH_URL, API_URL, APP_URL, GA_KEY, IS_PROD };