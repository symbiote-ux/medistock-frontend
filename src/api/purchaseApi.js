import axios from 'axios';
import { handleAxiosError } from './handleApiError';

const API_URL = process.env.REACT_APP_BACKEND_API_URL;

export const getMedicines = async () => {
  try {
    const response = await axios.get(`${API_URL}/medicines`);
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const getMedicineById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/medicines/${id}`);
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const addMedicine = async (MedicineData) => {
  try {
    const response = await axios.post(`${API_URL}/medicines`, MedicineData);
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const updateMedicine = async (id, MedicineData) => {
  try {
    const response = await axios.put(
      `${API_URL}/medicines/${id}`,
      MedicineData
    );
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const deleteMedicine = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/medicines/${id}`);
    return response.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};
