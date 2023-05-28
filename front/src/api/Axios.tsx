import axios from "axios";

axios.defaults.baseURL = "http://localhost"
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;


export default axios