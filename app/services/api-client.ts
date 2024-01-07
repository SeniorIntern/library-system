import axios, { CanceledError } from "axios";

const apiClient = axios.create({ baseURL: 'http://localhost:3001/api' })
export { apiClient, CanceledError } 
