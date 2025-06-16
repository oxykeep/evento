import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "../UI/Input";
import Button from "../UI/Button";
// Login component
// Define validation schema using Yup
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email") // Validate email format
    .required("Required"), // Make email field mandatory
  password: Yup.string().required("Required"), // Make password field mandatory
});

const Login = ({ onSubmit }) => {
  return (
    <div className="max-w-md mx-auto">
      {/* Form title */}
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

      {/* Formik wrapper for form state management */}
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            {/* Email input field */}
            <Input
              label="Email"
              id="email"
              name="email"
              type="email"
              // Show error only if field is touched and has error
              error={errors.email && touched.email ? errors.email : null}
            />

            {/* Password input field */}
            <Input
              label="Password"
              id="password"
              name="password"
              type="password"
              // Show error only if field is touched and has error
              error={
                errors.password && touched.password ? errors.password : null
              }
            />

            {/* Submit button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white hover:bg-blue-700"
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
