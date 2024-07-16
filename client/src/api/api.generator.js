import { axiosInstance } from "utilities/axiosInstance";

export class ApiGenerator {

    constructor(url, manageError) {
        this.url = url;
        this.manageError = manageError;
    }

    async get() {
        try {
            const response = await axiosInstance.get(this.url, this.headers);
            return response;
        } catch (error) {
            return this.manageError(error);
        }
    }
    
    async post(data) {
        try {
            const response = await axiosInstance.post(this.url, data, this.headers);
            return response;
        } catch (error) {
            return this.manageError(error);
        }
    }

    async put(data) {
        try {
            const response = await axiosInstance.put(this.url, data, this.headers);
            return response;
        } catch (error) {
            return this.manageError(error);
        }
    }

    async delete() {
        try {
            const response = await axiosInstance.delete(this.url, this.headers);
            return response;
        } catch (error) {
            return this.manageError(error);
        }
    }

    async patch(data) {
        try {
            const response = await axiosInstance.patch(this.url, data, this.headers);
            return response;
        } catch (error) {
            return this.manageError(error);
        }
    }
}