import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api, { createAgent } from "./../apis";

const SupportAgentForm = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    description: Yup.string().required("Description is required"),
  });
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    description: "",
  };
  const handleSubmit = (values) => {
    createAgent(values);
    console.log(values);
  };

  return (
    <div className="card shadow border-0 ">
      <div className="card-body p-5 ">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="row">
              <div className="col-12 mb-3">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>
              <div className="col mb-3">
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>
            </div>
            <div className="col mb-3">
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <Field
                  type="text"
                  id="phone"
                  name="phone"
                  className="form-control"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-danger"
                />
              </div>
            </div>
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
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default SupportAgentForm;
