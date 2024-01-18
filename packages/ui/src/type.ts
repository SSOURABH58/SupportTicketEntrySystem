// Define Support Agent and Support Ticket models here
export interface SupportAgent extends Document {
  name: string;
  email: string;
  phone: string;
  description: string;
  active: boolean;
  dateCreated: Date;
}

export interface SupportTicket extends Document {
  topic: string;
  description: string;
  dateCreated: Date;
  severity: string;
  type: string;
  assignedTo: string; // Support Agent ID
  status: string; // New, Assigned, Resolved
  resolvedOn?: Date;
}
