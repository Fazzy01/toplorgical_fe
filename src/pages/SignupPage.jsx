import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutateRegister } from '../lib/models/auth/hooks';
import { toast } from 'react-toastify';

function SignupPage() {
  const {isPending, mutate: onMutateLogin } = useMutateRegister({});
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData);
    console.log(values)

    if (!values.email || !values.password ) {
        toast.error("All fields are required");
        return;
    }

    setIsLoading(true);
    onMutateLogin(values, {
        onSuccess: (response) => {
            setIsLoading(false);
            toast.success("Registration successfully");
            navigate('/login');
        },
        onError: (error) => {
            console.log(error)
            setIsLoading(false);
            toast.error(error.response.data.message.toString());
        },
    });

 }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-900">
      <div className="w-full max-w-md rounded-lg border bg-white p-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="space-y-1 mb-4">
          <h2 className="text-2xl font-bold">Create an account</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Enter your information to create an account</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Full Name</label>
              <input
                id="fullname"
                name="fullname"
                placeholder="John Doe"
                required
                value={formData.fullname}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <input
                id="email"
                name="email"
                placeholder="john@example.com"
                required
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <input
                id="password"
                name="password"
                required
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <button
              className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create account"}
            </button>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link className="text-blue-600 hover:underline" to="/login">
                Login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;