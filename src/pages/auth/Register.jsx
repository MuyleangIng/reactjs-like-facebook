import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCreateUser,
  selectUser
} from "../../redux/feature/user/userSlice";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import { useNavigate } from "react-router-dom";

// REGEX for strong password
const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
// initial values
const initialValues = {
  username: "",
  email: "",
  password: "Qwer1234@",
  confirmPassword: "Qwer1234@"
};

// validation schema
const validationSchema = Yup.object({
  username: Yup.string().required("username is required"),
  email: Yup.string().email("email is invalid").required("email is required"),
  password: Yup.string()
    .matches(
      strongPasswordRegex,
      "password must contain one uppercase, one lowercase, one special character, number and must at least 8 characters"
    )
    .required("password is required"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "confirm password must match"
  )
});
export default function Register() {
  const [email, setEmail] = useState();
  const navigate = useNavigate();
  const userResponse = useSelector(selectUser);
  console.log("userResponse", userResponse);
  const dispatch = useDispatch();
  // handle navigate
  useEffect(() => {
    if (userResponse?.status === 201) {
      navigate("/verify-email", { state: email });
      // console.log("called");
    }
  }, [userResponse?.status, navigate]);
  // handleGetEmail
  const handleGetEmail = (e, setFieldValue) => {
    setEmail(e.target.value);
    setFieldValue("email", e.target.value);
  };
  // console.log("email: ", email);

  return (
    <section>
      <div className="flex justify-center items-center h-screen flex-col">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(value, { resetForm }) => {
            // console.log(value);
            dispatch(fetchCreateUser(value));
            resetForm();
          }}
        >
          {/* all this properties destructuring from object isSubmitting */}
          {({ isSubmitting, setFieldValue }) => {
            return (
              <Form className="w-1/2 bg-slate-50 p-5 rounded-md">
                {userResponse?.status === 409 && (
                  <Alert color="failure" icon={HiInformationCircle}>
                    {userResponse?.message}
                  </Alert>
                )}
                {/* username */}
                <div className="mt-5">
                  <label htmlFor="username" placeholder="John" required>
                    Username
                  </label>
                  <Field
                    type="text"
                    id="username"
                    name="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  <ErrorMessage
                    component="div"
                    name="username"
                    className="text-red-600"
                  />
                </div>
                {/* email */}
                <div className="mt-5">
                  <label htmlFor="email" required>
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => handleGetEmail(e, setFieldValue)}
                    required
                  />
                  <ErrorMessage
                    component="div"
                    name="email"
                    className="text-red-600"
                  />
                </div>
                {/* password */}
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
                {/* confirm password */}
                <div className="mt-5">
                  <label htmlFor="confirmPassword" required>
                    Confirm Password
                  </label>
                  <Field
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  <ErrorMessage
                    component="div"
                    name="confirmPassword"
                    className="text-red-600"
                  />
                </div>
                <button
                  type="submit"
                  className=" mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Register
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </section>
  );
}
