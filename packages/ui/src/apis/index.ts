import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5069/",
});

export const createAgent = async (agent) => {
  try {
    await api.post("/api/support-agents", agent);
  } catch (error) {
    console.log(error);
  }
};

export const createTicket = async (ticket) => {
  try {
    await api.post("/api/support-tickets", ticket);
  } catch (error) {
    console.log(error);
  }
};

export const getTickets = async () => {
  try {
    const response = await api.get("/api/support-tickets");
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default api;
