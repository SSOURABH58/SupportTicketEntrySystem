import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5069/",
});
console.log("process.env.PUBLIC_BASE_URL", process.env.PUBLIC_BASE_URL);

export default api;

export const createAgent = async (agent) => {
  try {
    await api.post("/api/support-agents", agent);
  } catch (error) {
    console.log(error);
  }
};

export const creatTicket = async (ticket) => {
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
