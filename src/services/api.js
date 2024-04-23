import axios from "axios";
const BASE_URL = "http://api.faash.tavand.ir";

const getMoadi = async () => {
    const response = await axios.get(`${BASE_URL}/moadi/index?per_page=1000&page=1`, {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("token")
        }
    })
    return response.data;
}
 
const getFactor = async (uuid) => {
    const response = await axios.get(`${BASE_URL}/moadi/${uuid}/invoice/index?page=1&per_page=12&sort=invoices.created_at,desc`, {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("token"),
        }
    })
    return response;
}

const getReport = async (uuid) => {
    const response = await axios.get(`${BASE_URL}/moadi/${uuid}/invoice/countStatus`, {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("token"),
        }
    })
    return response.data
}


export { getMoadi, getFactor, getReport } 