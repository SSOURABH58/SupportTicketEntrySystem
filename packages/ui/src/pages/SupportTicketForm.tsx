import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api, { createTicket } from "./../apis";

const SupportTicketForm = () => {
  const validationSchema = Yup.object().shape({
    topic: Yup.string().required("Name is required"),
    type: Yup.string().required("type is required"),
    description: Yup.string(),
    severity: Yup.string().required("Severity is required"),
  });

  const initialValues = {
    topic: "",
    type: "",
    severity: "",
    description: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log("values", values);
    resetForm();

    createTicket(values);
  };

  return (
    <div className="card shadow border-0">
      <div className="card-body p-5">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="row">
              <div className="col-12 mb-3">
                <div className="form-group">
                  <label htmlFor="topic" className="form-label">
                    Topic
                  </label>
                  <Field
                    type="text"
                    id="topic"
                    name="topic"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="topic"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col mb-3">
                <div className="form-group">
                  <label htmlFor="phone">Type</label>
                  <Field
                    type="text"
                    id="type"
                    name="type"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="type"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>
              <div className="col mb-3">
                <div className="form-group">
                  <label htmlFor="severity">Severity</label>
                  <Field
                    as="select"
                    id="severity"
                    name="severity"
                    className="form-control"
                  >
                    <option value="">Select Severity</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </Field>
                  <ErrorMessage
                    name="severity"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col mb-3">
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <Field
                    as="textarea"
                    id="description"
                    name="description"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default SupportTicketForm;
