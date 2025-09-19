import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { loginUser } from "./authSlice";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Button from "../../components/Button";
// import Input from "../../components/Input";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useAppSelector((s) => s.auth);

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.email) newErrors.email = "Email is required";
    else if (!form.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/))
      newErrors.email = "Enter a valid email";
    if (!form.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await dispatch(loginUser(form)).unwrap();
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error?.message || "Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-50 px-4">
      <Toaster position="top-right" />
      <div className="relative w-full max-w-md bg-white/70 backdrop-blur-sm border border-white/30 rounded-3xl shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-indigo-600 drop-shadow-md">Welcome Back</h2>
          <p className="text-gray-600 drop-shadow-sm mt-1">Login to manage your bookings 🔑</p>
        </div>

        {/* Form */}
        <form onSubmit={submit} className="space-y-5">
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              required
              placeholder="Email"
              className="peer w-full rounded-lg border border-gray-300 bg-transparent px-3 pt-5 pb-2 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-300"
            />
            <label className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-indigo-600 peer-focus:text-sm">
              Email
            </label>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={onChange}
              required
              placeholder="Password"
              className="peer w-full rounded-lg border border-gray-300 bg-transparent px-3 pt-5 pb-2 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-300"
            />
            <label className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-indigo-600 peer-focus:text-sm">
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <Button
            type="submit"
            loading={auth.status === "loading"}
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Login
          </Button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-indigo-600 hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
