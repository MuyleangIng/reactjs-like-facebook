import React from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";

// REGEX for strong password
const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
// initial values
const initialValues = {
  usernameOrEmail: "",
  password: ""
};

// validation schema
const validationSchema = Yup.object({
  usernameOrEmail: Yup.string().required("username or email is required"),
  password: Yup.string()
    .matches(
      "strongPasswordRegex",
      "password must contain one uppercase, one lowercase, one special character, number and must at least 8 characters"
    )
    .required("password is required")
});
export default function Login() {
  return (
    <section>
      <div className="flex justify-center items-center h-screen flex-col">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(value) => {
            console.log(value);
          }}
        >
          <Form className="w-1/2 bg-slate-50 p-5 rounded-md">
            <div className="mt-5">
              <label htmlFor="usernameOrEmail" placeholder="John" required>
                Username or Email
              </label>
              <Field
                type="text"
                id="usernameOrEmail"
                name="usernameOrEmail"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              <ErrorMessage
                component="div"
                name="usernameOrEmail"
                className="text-red-600"
              />
            </div>
            <div className="mt-5">
              <label htmlFor="password" required>
                Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              <ErrorMessage
                component="div"
                name="password"
                className="text-red-600"
              />
            </div>
            <div className="flex justify-between  mt-2">
              <a href="/register" className="">
                Don&apos;t have account?{" "}
                <span className="underline text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500">
                  register
                </span>
              </a>
              <a
                href="/forgot-password"
                className="mt-2 underline text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500"
              >
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className=" mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </Form>
        </Formik>
      </div>
    </section>
  );
}
