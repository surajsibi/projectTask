import axios from "axios"
import {BASE_URL} from "../constants"

const axisoInstance =axios.create();


axisoInstance.defaults.baseURL = BASE_URL;
axisoInstance.defaults.withCredentials = true;


export default axisoInstance