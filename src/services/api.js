import axios from 'axios';

// Free open API for demonstration
const exchangeApi = axios.create({
  baseURL: 'https://open.er-api.com/v6/latest',
});

export const getExchangeRates = async (baseCurrency = 'INR') => {
  try {
    const response = await exchangeApi.get(`/${baseCurrency}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching exchange rates", error);
    throw error;
  }
};
