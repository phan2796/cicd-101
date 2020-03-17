import axios from "axios";
import store from "../store";
import { push } from "connected-react-router";

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function(error) {
    if (error.response.status === 401) {
      store.dispatch(push("/logout"));
      return; // return res immediately
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axios;
