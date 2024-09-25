const IS_PROD = process.env.NODE_ENV === 'production';

// Default (Development) 
let GRAPH_URL = "https://wapi.waiz.cloud/graphql";
let API_URL = "https://wapi.waiz.cloud/api"; 
let APP_URL = "https://app.waiz.ai"; 
// let GRAPH_URL = "http://localhost:8000/graphql";
// let API_URL = "http://localhost:8000/api"; 
// let APP_URL = "http://localhost:3000";  
let GA_KEY = "UA-000000000-0";

// Production 
if (IS_PROD) { 
  let GRAPH_URL = "https://wapi.waiz.cloud/graphql";
  let API_URL = "https://wapi.waiz.cloud/api"; 
  APP_URL = "https://app.waiz.ai"; 
  GA_KEY = "UA-000000000-0";
}

export { GRAPH_URL, API_URL, APP_URL, GA_KEY, IS_PROD };