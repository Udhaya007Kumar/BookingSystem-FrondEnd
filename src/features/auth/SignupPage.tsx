import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { signupUser } from "./authSlice";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Button from "../../components/Button";

const SignupPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useAppSelector((s) => s.auth);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.first_name.trim()) newErrors.first_name = "First name is required";
    if (!form.last_name.trim()) newErrors.last_name = "Last name is required";
    if (!form.username.trim()) newErrors.username = "Username is required";
    if (!form.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) newErrors.email = "Enter a valid email";
    if (form.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await dispatch(signupUser(form)).unwrap();
      toast.success("Account created successfully!");
      navigate("/login");
    } catch (error: any) {
      if (error?.errors) setErrors(error.errors);
      toast.error(error?.message || "Signup failed");
    }
  };

  const getPasswordStrength = () => {
    if (!form.password) return { label: "", color: "", width: "w-0" };
    if (form.password.length < 8) return { label: "Weak", color: "bg-red-500", width: "w-1/3" };
    if (form.password.length < 12) return { label: "Medium", color: "bg-yellow-400", width: "w-2/3" };
    return { label: "Strong", color: "bg-green-500", width: "w-full" };
  };

  const strength = getPasswordStrength();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-50 flex items-center justify-center p-4">
      <Toaster position="top-right" />
      <div className="relative max-w-md w-full backdrop-blur-sm bg-white/70 rounded-3xl shadow-2xl overflow-hidden border border-white/30">
        {/* Animated Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-600 animate-gradient-x p-6 text-white text-center">
          <h2 className="text-3xl font-bold drop-shadow-md">Create Account</h2>
          <p className="mt-2 opacity-90 drop-shadow-sm">Join our awesome community</p>
        </div>

        <div className="p-8 space-y-5">
          <form onSubmit={submit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              {["first_name", "last_name"].map((field, idx) => (
                <div key={idx} className="relative">
                  <input
                    type="text"
                    name={field}
                    value={form[field as keyof typeof form]}
                    onChange={onChange}
                    required
                    className={`peer w-full rounded-lg border border-gray-300 bg-transparent px-3 pt-5 pb-2 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300`}
                    placeholder={field.replace("_", " ")}
                  />
                  <label className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-gray-600 peer-focus:text-sm capitalize">
                    {field.replace("_", " ")}
                  </label>
                  {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
                </div>
              ))}
            </div>

            {["username", "email", "password"].map((field, idx) => (
              <div key={idx} className="relative">
                <input
                  type={field === "password" ? "password" : "text"}
                  name={field}
                  value={form[field as keyof typeof form]}
                  onChange={onChange}
                  required
                  className={`peer w-full rounded-lg border border-gray-300 bg-transparent px-3 pt-5 pb-2 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300`}
                  placeholder={field}
                />
                <label className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-gray-600 peer-focus:text-sm capitalize">
                  {field}
                </label>
                {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
              </div>
            ))}

            {/* Password Strength Bar */}
            {form.password && (
              <div className="mt-1 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className={`h-2 ${strength.color} ${strength.width} transition-all duration-300`}></div>
              </div>
            )}

            <Button
              type="submit"
              loading={auth.status === "loading"}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
