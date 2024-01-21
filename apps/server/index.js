"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importStar(require("mongoose"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
var port = 5069; // Choose your desired port
var mongodbUrl = "mongodb+srv://testUser:123@support-ticket-system.zafbnh0.mongodb.net/?retryWrites=true&w=majority";
app.use(body_parser_1.default.json());
mongoose_1.default.connect(mongodbUrl);
var supportAgentSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    description: { type: String, required: false },
    active: { type: Boolean, default: true },
    dateCreated: { type: Date, default: Date.now },
    assignedTickets: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "SupportTicket" }],
});
var SupportAgentModel = mongoose_1.default.model("SupportAgent", supportAgentSchema);
var supportTicketSchema = new mongoose_1.Schema({
    topic: { type: String, required: true },
    description: { type: String },
    dateCreated: { type: Date, default: Date.now },
    severity: { type: String, required: true },
    type: { type: String, required: true },
    assignedTo: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "SupportAgent",
    },
    status: {
        type: String,
        enum: ["New", "Assigned", "Resolved"],
        default: "New",
    },
    resolvedOn: { type: Date },
});
var SupportTicketModel = mongoose_1.default.model("SupportTicket", supportTicketSchema);
app.post("/api/support-agents", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, email, phone, description, agent, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, name_1 = _a.name, email = _a.email, phone = _a.phone, description = _a.description;
                agent = new SupportAgentModel({ name: name_1, email: email, phone: phone, description: description });
                return [4 /*yield*/, agent.save()];
            case 1:
                _b.sent();
                res.status(201).json(agent);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                res.status(500).json({ error: "Failed to create support agent" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.post("/api/support-tickets", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, topic, description, severity, type, supportAgent, ticket, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, topic = _a.topic, description = _a.description, severity = _a.severity, type = _a.type;
                return [4 /*yield*/, SupportAgentModel.aggregate([
                        { $match: { active: true } },
                        { $addFields: { assignedTicketsCount: { $size: "$assignedTickets" } } },
                        { $sort: { assignedTicketsCount: 1 } },
                        { $limit: 1 },
                    ])];
            case 1:
                supportAgent = _b.sent();
                ticket = new SupportTicketModel({
                    topic: topic,
                    description: description,
                    severity: severity,
                    type: type,
                    assignedTo: supportAgent[0]._id || null,
                });
                return [4 /*yield*/, ticket.save()];
            case 2:
                _b.sent();
                return [4 /*yield*/, SupportAgentModel.updateOne({ _id: supportAgent[0]._id }, { $push: { assignedTickets: ticket._id } })];
            case 3:
                _b.sent();
                res.status(201).json(ticket);
                return [3 /*break*/, 5];
            case 4:
                error_2 = _b.sent();
                res.status(500).json({ error: "Failed to create support ticket" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
app.get("/api/support-tickets", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, status_1, assignedTo, severity, type, sortBy, order, page, limit, query, pageNumber, pageSize, skip, tickets, totalCount, totalPages, error_3;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 3, , 4]);
                console.log("Get tickets");
                _a = req.query, status_1 = _a.status, assignedTo = _a.assignedTo, severity = _a.severity, type = _a.type, sortBy = _a.sortBy, order = _a.order, page = _a.page, limit = _a.limit;
                query = {};
                if (status_1) {
                    query.status = status_1;
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
                pageNumber = page || 1;
                pageSize = limit || 10;
                skip = (pageNumber - 1) * pageSize;
                return [4 /*yield*/, SupportTicketModel.find(query)
                        .sort((_b = {}, _b[sortBy !== null && sortBy !== void 0 ? sortBy : "dateCreated"] = order !== null && order !== void 0 ? order : 1, _b))
                        .skip(skip)
                        .limit(pageSize)];
            case 1:
                tickets = _c.sent();
                return [4 /*yield*/, SupportTicketModel.countDocuments(query)];
            case 2:
                totalCount = _c.sent();
                totalPages = Math.ceil(totalCount / pageSize);
                res.status(200).json({
                    tickets: tickets,
                    page: pageNumber,
                    totalPages: totalPages,
                    totalCount: totalCount,
                });
                return [3 /*break*/, 4];
            case 3:
                error_3 = _c.sent();
                res.status(500).json({ error: "Failed to get support tickets" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get("/api/hello", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            res.status(200).json({ message: "Hello" });
        }
        catch (error) {
            res.status(500).json({ error: "Failed to get support tickets" });
        }
        return [2 /*return*/];
    });
}); });
// end point to resolve a ticket and remove it form the assigned tickets of the agent
app.put("/api/support-tickets/:id/resolve", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, ticket, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                id = req.params.id;
                return [4 /*yield*/, SupportTicketModel.findById(id)];
            case 1:
                ticket = _a.sent();
                if (!ticket) {
                    res.status(404).json({ error: "Ticket not found" });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, SupportTicketModel.updateOne({ _id: id }, { status: "Resolved", resolvedOn: Date.now() })];
            case 2:
                _a.sent();
                return [4 /*yield*/, SupportAgentModel.updateOne({ _id: ticket.assignedTo }, { $pull: { assignedTickets: id } })];
            case 3:
                _a.sent();
                res.status(200).json({ message: "Ticket resolved" });
                return [3 /*break*/, 5];
            case 4:
                error_4 = _a.sent();
                res.status(500).json({ error: "Failed to resolve ticket" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
app.listen(port, function () {
    console.log("Server is running on port ".concat(port));
});
//# sourceMappingURL=index.js.map