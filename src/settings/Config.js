const IS_PROD = process.env.NODE_ENV === 'production';

// Default (Development)

// let GRAPH_URL = "http://stg-api.waiz.ai:8000/graphql";
// let API_URL = "http://stg-api.waiz.ai:8000/api";
let GRAPH_URL = "http://localhost:8000/graphql";
let API_URL = "http://localhost:8000/api"; 
  
// let GRAPH_URL = "http://localhost:8000/graphql";
// let API_URL = "http://localhost:8000/api";
let APP_URL = "http://localhost:3000";
let GA_KEY = "UA-000000000-0";

// Production

if (IS_PROD) {
  // GRAPH_URL = "https://api.waiz.ai/graphql";
  // API_URL = "https://api.waiz.ai/api";
  let GRAPH_URL = "https://wapi.waiz.cloud/graphql";
  let API_URL = "https://wapi.waiz.cloud/api";
  // let GRAPH_URL = "http://54.151.214.68:8000/graphql";
  // let API_URL = "http://54.151.214.68:8000/api";
  APP_URL = "https://app.waiz.ai";
  // APP_URL = "http://app.waiz.cloud";
  GA_KEY = "UA-000000000-0";
}

export { GRAPH_URL, API_URL, APP_URL, GA_KEY, IS_PROD };