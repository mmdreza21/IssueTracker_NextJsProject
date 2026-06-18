import axios, { type AxiosRequestConfig } from "axios";


export const axiosInstance = axios.create({

});

class APIClient<T> {
    private endpoint: string;
    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAll(params?: AxiosRequestConfig) {
        return axiosInstance.get<T>(this.endpoint, params).then((res) => res.data);
    }
}

export default APIClient;