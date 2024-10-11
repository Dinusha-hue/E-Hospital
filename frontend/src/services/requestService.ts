import axios from 'axios';

const API_URL = 'http://localhost:5000/api/requests';

// Get all requests
export const getRequests = async () => {
    try {
        const response = await axios.get(`${API_URL}/getrequests`);
        console.log('API URL:', API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching requests:", error);
        return []; 
    }
}

// Get request by ID
export const getRequestById = async (id: string) => {
    const response = await axios.get(`${API_URL}/getrequestsbyid/${id}`);
    return response.data;
};

// Create a new request
export const createRequest = async (formData: FormData) => {
    try {
        const response = await axios.post(`${API_URL}/postrequests`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating request:', error);
        throw error; 
    }
};

// Update an existing request
export const updateRequest = async (id: string, formData: FormData) => {
    try {
        const response = await axios.put(`${API_URL}/updateRequest/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating request:', error);
        throw error; 
    }
};

// Delete a request
export const deleteRequest = async (id: string) => {
    try {
        const response = await axios.delete(`${API_URL}/deleterequests/${id}`);
        return response.data; 
    } catch (error) {
        console.error('Error deleting request:', error);
        throw error; 
    }
};
