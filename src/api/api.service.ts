import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

export class ApiService {
  async get(url: string): Promise<unknown> {
    try {
      return await axios.get(url).then((res: AxiosResponse) => res.data);
    } catch (error) {
      console.error('ApiService get() error: ', error);
    }
  }
  async post(url: string, request: AxiosRequestConfig): Promise<unknown> {
    try {
      return await axios.post(url, request).then((res: AxiosResponse) => res.data);
    } catch (error) {
      console.error('ApiService post() error: ', error);
    }
  }
  async put(url: string, request: AxiosRequestConfig): Promise<unknown> {
    try {
      return await axios.put(url, request).then((res: AxiosResponse) => res.data);
    } catch (error) {
      console.error('ApiService put() error: ', error);
    }
  }
  async patch(url: string, request: AxiosRequestConfig): Promise<unknown> {
    try {
      return await axios.patch(url, request).then((res: AxiosResponse) => res.data);
    } catch (error) {
      console.error('ApiService patch() error: ', error);
    }
  }
  async delete(url: string, request: AxiosRequestConfig): Promise<unknown> {
    try {
      return await axios.delete(url, request).then((res: AxiosResponse) => res.data);
    } catch (error) {
      console.error('ApiService delete() error: ', error);
    }
  }
}