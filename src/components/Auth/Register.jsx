import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "../UI/Input";
import Button from "../UI/Button";
//Registration component
// Validation schema using Yup for form validation
const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Required"), // Name is required
  email: Yup.string()
    .email("Invalid email") // Must be a valid email format
    .required("Required"), // Email is required
  password: Yup.string()
    .min(6, "Too short") // Minimum 6 characters
    .required("Required"), // Password is required
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match") // Must match password field
    .required("Required"), // Confirm password is required
});

const Register = ({ onSubmit }) => {
  return (
    <div className="max-w-md mx-auto">
      {/* Form title */}
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

      {/* Formik wrapper for form state management */}
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={RegisterSchema} // Apply validation rules
        onSubmit={onSubmit} // Handle form submission
      >
        {({ errors, touched }) => (
          <Form>
            {/* Name input field */}
            <Input
              label="Name"
              id="name"
              name="name"
              type="text"
              error={errors.name && touched.name ? errors.name : null}
            />

            {/* Email input field */}
            <Input
              label="Email"
              id="email"
              name="email"
              type="email"
              error={errors.email && touched.email ? errors.email : null}
            />

            {/* Password input field with minimum length validation */}
            <Input
              label="Password"
              id="password"
              name="password"
              type="password"
              error={
                errors.password && touched.password ? errors.password : null
              }
            />

            {/* Confirm password input field with matching validation */}
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

            {/* Submit button with green color scheme */}
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
