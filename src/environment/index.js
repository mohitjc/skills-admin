let host = document.location.host;
let apiUrl ='http://portal.jcsoftwaresolution.in:6068/'
if(host.includes('localhost')){
  apiUrl='http://portal.jcsoftwaresolution.in:6068/'
  // apiUrl='https://app2api.dazhboards.com/'
}

const environment = {
    api: apiUrl,
    map_api_key:'AIzaSyCbRhC6h9Pp43-5t_Knyrd_ewAdLMIJtCg',
    planTypeId:'65ead4e65cfbfd7a03ed102f',
    userRoleId:'65eac23ceac028f4dbfb1fbc',
    adminRoleId:'65eab1d84e01e43033dc2438',
    resellerTypeId:'64b23b7d690d1d5f7ae76102',
    productTypeId:'64a7d198fa039f179c0320ca'
  };
  export default environment;
