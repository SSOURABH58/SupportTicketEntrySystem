import express, { Request, Response } from "express";
import mongoose, { Schema, Document } from "mongoose";
import bodyParser from "body-parser";

const app = express();
const port = 5069; // Choose your desired port
const mongodbUrl = `mongodb+srv://testUser:123@support-ticket-system.zafbnh0.mongodb.net/?retryWrites=true&w=majority`;

app.use(bodyParser.json());

// Connect to MongoDB (replace 'your-mongodb-uri' with your actual MongoDB URI)
mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Support Agent and Support Ticket models here
interface SupportAgent extends Document {
  name: string;
  email: string;
  phone: string;
  description: string;
  active: boolean;
  dateCreated: Date;
}

const supportAgentSchema = new Schema<SupportAgent>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  description: { type: String, required: false },
  active: { type: Boolean, default: true },
  dateCreated: { type: Date, default: Date.now },
});

const SupportAgentModel = mongoose.model<SupportAgent>(
  "SupportAgent",
  supportAgentSchema
);

interface SupportTicket extends Document {
  topic: string;
  description: string;
  dateCreated: Date;
  severity: string;
  type: string;
  assignedTo: SupportAgent;
  status: string; // New, Assigned, Resolved
  resolvedOn?: Date;
}

const supportTicketSchema = new Schema<SupportTicket>({
  topic: { type: String, required: true },
  description: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now },
  severity: { type: String, required: true },
  type: { type: String, required: true },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: "SupportAgent",
    required: true,
  },
  status: {
    type: String,
    enum: ["New", "Assigned", "Resolved"],
    default: "New",
  },
  resolvedOn: { type: Date },
});

const SupportTicketModel = mongoose.model<SupportTicket>(
  "SupportTicket",
  supportTicketSchema
);

// Define API endpoints for creating support agents and tickets
app.post("/api/support-agents", async (req: Request, res: Response) => {
  try {
    const { name, email, phone, description } = req.body;
    const agent = new SupportAgentModel({ name, email, phone, description });
    await agent.save();
    res.status(201).json(agent);
  } catch (error) {
    res.status(500).json({ error: "Failed to create support agent" });
  }
});

app.post("/api/support-tickets", async (req: Request, res: Response) => {
  try {
    const { topic, description, severity, type } = req.body;
    const activeAgents = await SupportAgentModel.find({ active: true });
    if (activeAgents.length === 0) {
      return res
        .status(404)
        .json({ error: "No active support agents available" });
    }
    const nextAgentIndex = activeAgents.findIndex((agent) =>
      agent._id.equals(req.body.assignedTo)
    );
    const assignedTo = activeAgents[nextAgentIndex % activeAgents.length];
    const ticket = new SupportTicketModel({
      topic,
      description,
      severity,
      type,
      assignedTo,
    });
    await ticket.save();
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ error: "Failed to create support ticket" });
  }
});

//create an API for ticket assignment to support agent in a round-robin fashion
app.post("/api/assign-ticket", async (req: Request, res: Response) => {
  try {
    const { ticketId } = req.body;
    const ticket = await SupportTicketModel.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    const activeAgents = await SupportAgentModel.find({ active: true });
    if (activeAgents.length === 0) {
      return res
        .status(404)
        .json({ error: "No active support agents available" });
    }
    const currentAgentIndex = activeAgents.findIndex((agent) =>
      agent._id.equals(ticket.assignedTo)
    );
    const nextAgentIndex =
      currentAgentIndex === activeAgents.length - 1 ? 0 : currentAgentIndex + 1;
    const nextAgent = activeAgents[nextAgentIndex];
    ticket.assignedTo = nextAgent;
    await ticket.save();
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ error: "Failed to assign ticket" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
