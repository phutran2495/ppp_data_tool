import axios from 'axios';

// Extend ImportMeta interface to include env property for Vite
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const searchBusinesses = async (
    name: string,
    state?: string,
    city?: string
) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/search`, {
            params: { name, state, city }
        });
        return response.data;
    } catch (error: any) {
        throw new Error('Error fetching businesses: ' + error.message);
    }
};

export const getBusinessByTin = async (tin: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/business/${tin}`);
        console.log(response.data);
        return response.data;
    } catch (error: any) {
        throw new Error('Error fetching business details: ' + error.message);
    }
};

export const loadPppData = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/load`);
        return response.data;
    } catch (error: any) {
        throw new Error('Error loading PPP data: ' + error.message);
    }
};