import express, { Request, Response } from "express";
import mongoose, { Schema, Document, SortOrder } from "mongoose";
import bodyParser from "body-parser";
import cros from "cors";

const app = express();
app.use(cros());
const port = 5069; // Choose your desired port
const mongodbUrl = `mongodb+srv://testUser:123@support-ticket-system.zafbnh0.mongodb.net/?retryWrites=true&w=majority`;

app.use(bodyParser.json());

mongoose.connect(mongodbUrl);

interface SupportAgent extends Document {
  name: string;
  email: string;
  phone: string;
  description: string;
  active: boolean;
  dateCreated: Date;
  assignedTickets: mongoose.Types.ObjectId[];
}

const supportAgentSchema = new Schema<SupportAgent>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  description: { type: String, required: false },
  active: { type: Boolean, default: true },
  dateCreated: { type: Date, default: Date.now },
  assignedTickets: [{ type: Schema.Types.ObjectId, ref: "SupportTicket" }],
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

    // to Find the first support agent that is active and has the least number of assigned tickets
    const supportAgent = await SupportAgentModel.aggregate([
      { $match: { active: true } },
      { $addFields: { assignedTicketsCount: { $size: "$assignedTickets" } } },
      { $sort: { assignedTicketsCount: 1 } },
      { $limit: 1 },
    ]);

    const ticket = new SupportTicketModel({
      topic,
      description,
      severity,
      type,
      assignedTo: supportAgent[0]._id || null,
    });

    await ticket.save();
    await SupportAgentModel.updateOne(
      { _id: supportAgent[0]._id },
      { $push: { assignedTickets: ticket._id } }
    );

    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ error: "Failed to create support ticket" });
  }
});

app.get(
  "/api/support-tickets",
  async (
    req: Request<
      {},
      {},
      {},
      {
        status?: string;
        assignedTo?: string;
        severity?: string;
        type?: string;
        sortBy?: string;
        order?: SortOrder;
        page?: number;
        limit?: number;
      }
    >,
    res: Response
  ) => {
    try {
      console.log("Get tickets");

      const { status, assignedTo, severity, type, sortBy, order, page, limit } =
        req.query;
      const query: any = {};

      if (status) {
        query.status = status;
      }

      if (assignedTo) {
        query.assignedTo = assignedTo;
      }

      if (severity) {
        query.severity = severity;
      }

      if (type) {
        query.type = type;
      }

      const pageNumber = page || 1;
      const pageSize = limit || 10;
      const skip = (pageNumber - 1) * pageSize;

      const tickets = await SupportTicketModel.find(query)
        .sort({ [sortBy ?? "dateCreated"]: order ?? 1 })
        .skip(skip)
        .limit(pageSize);

      const totalCount = await SupportTicketModel.countDocuments(query);

      const totalPages = Math.ceil(totalCount / pageSize);

      res.status(200).json({
        tickets,
        page: pageNumber,
        totalPages,
        totalCount,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to get support tickets" });
    }
  }
);

app.get("/api/hello", async (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "Hello" });
  } catch (error) {
    res.status(500).json({ error: "Failed to get support tickets" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
