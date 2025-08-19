const IS_PROD = process.env.NODE_ENV === 'production';

// // Default (Development) 
// let GRAPH_URL = "http://18.141.8.119:8000/graphql";
// let API_URL = "http://18.141.8.119:8000/api"; 
// let APP_URL = "http://18.141.8.119:8000"; 
// // let GRAPH_URL = "http://localhost:8000/graphql";
// // let API_URL = "http://localhost:8000/api"; 
// // let APP_URL = "http://localhost:3000";  
// let GA_KEY = "UA-000000000-0";
// let CHATBOT = "https://y722zxgrdj.execute-api.ap-southeast-1.amazonaws.com/dev/waiz_chat";

// // Production 
// if (IS_PROD) { 
//   let GRAPH_URL = "https://wapi.waiz.cloud/graphql";
//   let API_URL = "https://wapi.waiz.cloud/api"; 
//   APP_URL = "https://app.waiz.ai"; 
//   GA_KEY = "UA-000000000-0";
// }

// Default (Development)
let domain = '54.169.73.121';
let GRAPH_URL = `http://${domain}:8000/graphql`; //let GRAPH_URL = `http://${domain}:8000/graphql`;
let API_URL = `http://${domain}:8000/api`; //let API_URL = `http://${domain}:8000/api`;
let APP_URL = `http://${domain}:3000`; //let APP_URL = `http://${domain}:3000`;
let GA_KEY = "UA-000000000-0";
let CHATBOT = "https://y722zxgrdj.execute-api.ap-southeast-1.amazonaws.com/dev/waiz_chat";

// Production
if (IS_PROD) {
  let GRAPH_URL = "https://wapi.waiz.cloud/graphql";
  let API_URL = "https://wapi.waiz.cloud/api";
  APP_URL = "https://app.waiz.ai";
  GA_KEY = "UA-000000000-0";
}

module.exports = { GRAPH_URL, API_URL, APP_URL, GA_KEY, IS_PROD, CHATBOT };