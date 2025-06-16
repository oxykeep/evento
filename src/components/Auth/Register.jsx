// src/components/Auth/Register.jsx

import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "../UI/Input";
import Button from "../UI/Button";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too short").required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

const Register = ({ onSubmit }) => {
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={RegisterSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <Input
              label="Name"
              id="name"
              name="name"
              type="text"
              error={errors.name && touched.name ? errors.name : null}
            />
            <Input
              label="Email"
              id="email"
              name="email"
              type="email"
              error={errors.email && touched.email ? errors.email : null}
            />
            <Input
              label="Password"
              id="password"
              name="password"
              type="password"
              error={
                errors.password && touched.password ? errors.password : null
              }
            />
            <Input
              label="Confirm Password"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              error={
                errors.confirmPassword && touched.confirmPassword
                  ? errors.confirmPassword
                  : null
              }
            />
            <Button
              type="submit"
              className="w-full bg-green-600 text-white hover:bg-green-700"
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
