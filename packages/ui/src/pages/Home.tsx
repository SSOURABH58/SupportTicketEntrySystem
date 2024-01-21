import React, { useEffect, useState } from "react";
import axios from "axios";
import { getTickets, resolveTicket } from "./../apis";

const Home = () => {
  const [tickets, setTickets] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    status: "",
    assignedTo: "",
    severity: "",
    type: "",
  });
  const [sort, setSort] = useState({
    sortBy: "dateCreated",
    order: "asc",
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 1,
    totalCount: 0,
  });

  const fetchTickets = async () => {
    const { tickets, totalPages, totalCount } = await getTickets({
      ...filters,
      sortBy: sort.sortBy,
      order: sort.order,
      page: pagination.page,
      limit: pagination.limit,
    });

    setTickets(tickets);
    setPagination((prevState) => ({
      ...prevState,
      totalPages,
      totalCount,
    }));
  };

  useEffect(() => {
    fetchTickets();
  }, [filters, sort, pagination.page, pagination.limit]);

  const handleFilterChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  const handleSortChange = (event) => {
    setSort({ ...sort, [event.target.name]: event.target.value });
  };

  const handlePageChange = (event) => {
    setPagination({ ...pagination, page: parseInt(event.target.value) });
  };

  const handleResolveTicket = async (ticketId) => {
    await resolveTicket(ticketId);
    // Refresh tickets after resolving
    fetchTickets();
  };

  return (
    <div className="container">
      <h1 className="mt-4 ">Support Tickets</h1>

      <div className="row mt-4">
        <div className="col-md-3">
          <label>Status:</label>
          <select
            className="form-select"
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            <option value="open">Open</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        <div className="col-md-3">
          <label>Assigned To:</label>
          <input
            type="text"
            className="form-control"
            name="assignedTo"
            value={filters.assignedTo}
            onChange={handleFilterChange}
          />
        </div>

        <div className="col-md-3">
          <label>Severity:</label>
          <select
            className="form-select"
            name="severity"
            value={filters.severity}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="col-md-3">
          <label>Type:</label>
          <select
            className="form-select"
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            <option value="bug">Bug</option>
            <option value="feature">Feature</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <table className="table mt-4 ">
        <thead>
          <tr>
            <th>
              Topic
              <button
                className="btn btn-link"
                onClick={() =>
                  setSort({
                    sortBy: "topic",
                    order:
                      sort.sortBy === "topic" && sort.order === "asc"
                        ? "desc"
                        : "asc",
                  })
                }
              >
                {sort.sortBy === "topic" && sort.order === "asc" ? (
                  <i className="bi bi-caret-up-fill"></i>
                ) : (
                  <i className="bi bi-caret-down-fill"></i>
                )}
              </button>
            </th>
            <th>
              Description
              <button
                className="btn btn-link"
                onClick={() =>
                  setSort({
                    sortBy: "description",
                    order:
                      sort.sortBy === "description" && sort.order === "asc"
                        ? "desc"
                        : "asc",
                  })
                }
              >
                {sort.sortBy === "description" && sort.order === "asc" ? (
                  <i className="bi bi-caret-up-fill"></i>
                ) : (
                  <i className="bi bi-caret-down-fill"></i>
                )}
              </button>
            </th>
            <th>
              Date Created
              <button
                className="btn btn-link"
                onClick={() =>
                  setSort({
                    sortBy: "dateCreated",
                    order:
                      sort.sortBy === "dateCreated" && sort.order === "asc"
                        ? "desc"
                        : "asc",
                  })
                }
              >
                {sort.sortBy === "dateCreated" && sort.order === "asc" ? (
                  <i className="bi bi-caret-up-fill"></i>
                ) : (
                  <i className="bi bi-caret-down-fill"></i>
                )}
              </button>
            </th>
            <th>
              Severity
              <button
                className="btn btn-link"
                onClick={() =>
                  setSort({
                    sortBy: "severity",
                    order:
                      sort.sortBy === "severity" && sort.order === "asc"
                        ? "desc"
                        : "asc",
                  })
                }
              >
                {sort.sortBy === "severity" && sort.order === "asc" ? (
                  <i className="bi bi-caret-up-fill"></i>
                ) : (
                  <i className="bi bi-caret-down-fill"></i>
                )}
              </button>
            </th>
            <th>
              Type
              <button
                className="btn btn-link"
                onClick={() =>
                  setSort({
                    sortBy: "type",
                    order:
                      sort.sortBy === "type" && sort.order === "asc"
                        ? "desc"
                        : "asc",
                  })
                }
              >
                {sort.sortBy === "type" && sort.order === "asc" ? (
                  <i className="bi bi-caret-up-fill"></i>
                ) : (
                  <i className="bi bi-caret-down-fill"></i>
                )}
              </button>
            </th>
            <th>
              Assigned To
              <button
                className="btn btn-link"
                onClick={() =>
                  setSort({
                    sortBy: "assignedTo",
                    order:
                      sort.sortBy === "assignedTo" && sort.order === "asc"
                        ? "desc"
                        : "asc",
                  })
                }
              >
                {sort.sortBy === "assignedTo" && sort.order === "asc" ? (
                  <i className="bi bi-caret-up-fill"></i>
                ) : (
                  <i className="bi bi-caret-down-fill"></i>
                )}
              </button>
            </th>
            <th>
              Status
              <button
                className="btn btn-link"
                onClick={() =>
                  setSort({
                    sortBy: "status",
                    order:
                      sort.sortBy === "status" && sort.order === "asc"
                        ? "desc"
                        : "asc",
                  })
                }
              >
                {sort.sortBy === "status" && sort.order === "asc" ? (
                  <i className="bi bi-caret-up-fill"></i>
                ) : (
                  <i className="bi bi-caret-down-fill"></i>
                )}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket, index) => (
            <tr
              key={ticket._id}
              style={{
                backgroundColor: index % 2 === 0 ? "#f8f9fa" : "#e9ecef",
              }}
            >
              <td>{ticket.topic}</td>
              <td>{ticket.description}</td>
              <td>{new Date(ticket.dateCreated).toLocaleString()}</td>
              <td>{ticket.severity}</td>
              <td>{ticket.type}</td>
              <td>{ticket.assignedTo}</td>
              <td>
                {ticket.status !== "Resolved" ? (
                  <button
                    className="btn btn-primary"
                    onClick={() => handleResolveTicket(ticket._id)}
                  >
                    Resolve
                  </button>
                ) : (
                  <span className="badge bg-success">Resolved</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="row mt-4">
        <div className="col-md-3">
          <label>Sort By:</label>
          <select
            className="form-select"
            name="sortBy"
            value={sort.sortBy}
            onChange={handleSortChange}
          >
            <option value="dateCreated">Date Created</option>
            <option value="severity">Severity</option>
            <option value="type">Type</option>
          </select>
        </div>

        <div className="col-md-3">
          <label>Order:</label>
          <select
            className="form-select"
            name="order"
            value={sort.order}
            onChange={handleSortChange}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        <div className="col-md-3">
          <label>Page:</label>
          <input
            type="number"
            className="form-control"
            min="1"
            max={pagination.totalPages}
            value={pagination.page}
            onChange={handlePageChange}
          />
        </div>

        <div className="col-md-3">
          <span className="mt-2">of {pagination.totalPages}</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
