let host = document.location.host;
let apiUrl ='https://skillprobackend.azurewebsites.net/'
if(host.includes('localhost')){
  // apiUrl='http://portal.jcsoftwaresolution.in:6068/'
  apiUrl='https://skillprobackend.azurewebsites.net/'
}

const environment = {
    api: apiUrl,
    map_api_key:'AIzaSyCbRhC6h9Pp43-5t_Knyrd_ewAdLMIJtCg',
    planTypeId:'65ead4e65cfbfd7a03ed102f',
    userRoleId:'65eac23ceac028f4dbfb1fbc',
    adminRoleId:'65eab1d84e01e43033dc2438',
    professionType:'65fa7ad79ef95c639effcf1c',
    productTypeId:'64a7d198fa039f179c0320ca'
  };
  export default environment;
