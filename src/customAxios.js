import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.cypress.io',
  headers:{
    common:{'Authorization': 'AUTH FROM INSTANCE'}
  }
});

//axiosInstance.defaults.headers.Authorization = 'AUTH TOKEN FROM INSTANCE';
axiosInstance.interceptors.request.use(request => {
  return request;
}, error => {
  console.log(error);
  return Promise.reject(error);
});
export default axiosInstance;