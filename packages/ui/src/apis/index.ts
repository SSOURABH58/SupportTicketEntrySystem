import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  // baseURL: "http://localhost:5069/",
  baseURL: "https://supportticket-ly5l.onrender.com/",
});

export const createAgent = async (agent) => {
  try {
    await api.post("/api/support-agents", agent);
    toast.success("Agent Create Successfully");
  } catch (error) {
    toast.error("Failed to create support agent");
    console.log(error);
  }
};

export const createTicket = async (ticket) => {
  try {
    await api.post("/api/support-tickets", ticket);
    toast.success("Ticket Create Successfully");
  } catch (error) {
    toast.error("Failed to create support ticket");
    console.log(error);
  }
};

export const getTickets = async (filters) => {
  try {
    const response = await api.get("/api/support-tickets", {
      params: {
        ...filters,
      },
    });
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const resolveTicket = async (ticketId) => {
  try {
    await api.put(`/api/support-tickets/${ticketId}/resolve`);
    toast.success("Ticket Resolved Successfully");
  } catch (error) {
    toast.error("Failed to resolve support ticket");
    console.log(error);
  }
};

export default api;
