import axios from 'axios';
import { handleAxiosError } from './handleApiError';

const API_URL = process.env.REACT_APP_BACKEND_API_URL;

export const getCustomers = async () => {
  try {
    const response = await axios.get(`${API_URL}/customers`);
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const getCustomerById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/customers/${id}`);
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const addCustomer = async (customerData) => {
  try {
    const response = await axios.post(`${API_URL}/customers`, customerData);
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const updateCustomer = async (id, customerData) => {
  try {
    const response = await axios.put(
      `${API_URL}/customers/${id}`,
      customerData
    );
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const deleteCustomer = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/customers/${id}`);
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};
