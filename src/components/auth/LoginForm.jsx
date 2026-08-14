import { useState } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    }

    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    // Backend connection will be added later.
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Login data:", formData);

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-ink"
        >
          Email address
        </label>

        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className={`w-full rounded-2xl border bg-white/60 px-4 py-3.5 text-sm text-ink outline-none transition placeholder:text-placeholder focus:border-gold focus:ring-2 focus:ring-gold/20 ${
            errors.email ? "border-danger-text" : "border-line"
          }`}
        />

        {errors.email && (
          <p className="mt-2 text-sm text-danger-text">{errors.email}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label htmlFor="password" className="text-sm font-medium text-ink">
            Password
          </label>

          <a
            href="/forgot-password"
            className="text-sm font-medium text-primary transition hover:text-primary-light"
          >
            Forgot password?
          </a>
        </div>

        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className={`w-full rounded-2xl border bg-white/60 px-4 py-3.5 pr-12 text-sm text-ink outline-none transition placeholder:text-placeholder focus:border-gold focus:ring-2 focus:ring-gold/20 ${
              errors.password ? "border-danger-text" : "border-line"
            }`}
          />

          <button
            type="button"
            onClick={() => setShowPassword((previous) => !previous)}
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-muted transition hover:bg-paper hover:text-ink"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff size={18} strokeWidth={1.8} />
            ) : (
              <Eye size={18} strokeWidth={1.8} />
            )}
          </button>
        </div>

        {errors.password && (
          <p className="mt-2 text-sm text-danger-text">{errors.password}</p>
        )}
      </div>

      {/* Login button */}
      <button
        type="submit"
        disabled={isLoading}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-medium text-white transition hover:bg-primary-light disabled:cursor-not-allowed disabled:bg-[#E4DFC9] disabled:text-placeholder"
      >
        {isLoading ? "Signing in..." : "Log in"}

        {!isLoading && <ArrowRight size={18} strokeWidth={1.8} />}
      </button>

      {/* Register */}
      <p className="pt-2 text-center text-sm text-muted">
        Don't have an account?{" "}
        <a
          href="/register"
          className="font-medium text-primary transition hover:text-primary-light"
        >
          Create one
        </a>
      </p>
    </form>
  );
};

export default LoginForm;
