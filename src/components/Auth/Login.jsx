import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "../UI/Input";
import Button from "../UI/Button";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const Login = ({ onSubmit }) => {
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Form>
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
