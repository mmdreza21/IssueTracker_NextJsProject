import axios, { type AxiosRequestConfig } from "axios";


export const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/'
});

class APIClient<T> {
    private endpoint: string;
    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAll(params?: AxiosRequestConfig) {


        return axiosInstance.get<T>(this.endpoint, params).then((res) => {
            return res.data
        });

    }


}

export default APIClient;