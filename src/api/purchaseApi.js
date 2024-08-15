import axios from 'axios';
import { handleAxiosError } from './handleApiError';

const API_URL = process.env.REACT_APP_BACKEND_API_URL;

export const getPurchases = async () => {
  try {
    const response = await axios.get(`${API_URL}/purchases`);
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const getPurchaseById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/purchases/${id}`);
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const addPurchase = async (PurchaseData) => {
  try {
    const response = await axios.post(`${API_URL}/purchases`, PurchaseData);
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const deletePurchase = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/purchases/${id}`);
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};
