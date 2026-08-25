import { useState } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
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

    console.log("Registration data:", formData);

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-ink"
        >
          Full name
        </label>

        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your full name"
          className={`w-full rounded-2xl border bg-white/60 px-4 py-3.5 text-sm text-ink outline-none transition placeholder:text-placeholder focus:border-gold focus:ring-2 focus:ring-gold/20 ${
            errors.name ? "border-danger-text" : "border-line"
          }`}
        />

        {errors.name && (
          <p className="mt-2 text-sm text-danger-text">{errors.name}</p>
        )}
      </div>

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
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-ink"
        >
          Password
        </label>

        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            placeholder="At least 8 characters"
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

      {/* Confirm password */}
      <div>
        <label
          htmlFor="confirmPassword"
          className="mb-2 block text-sm font-medium text-ink"
        >
          Confirm password
        </label>

        <div className="relative">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter your password"
            className={`w-full rounded-2xl border bg-white/60 px-4 py-3.5 pr-12 text-sm text-ink outline-none transition placeholder:text-placeholder focus:border-gold focus:ring-2 focus:ring-gold/20 ${
              errors.confirmPassword ? "border-danger-text" : "border-line"
            }`}
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword((previous) => !previous)}
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-muted transition hover:bg-paper hover:text-ink"
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? (
              <EyeOff size={18} strokeWidth={1.8} />
            ) : (
              <Eye size={18} strokeWidth={1.8} />
            )}
          </button>
        </div>

        {errors.confirmPassword && (
          <p className="mt-2 text-sm text-danger-text">
            {errors.confirmPassword}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-medium text-white transition hover:bg-primary-light disabled:cursor-not-allowed disabled:bg-[#E4DFC9] disabled:text-placeholder"
      >
        {isLoading ? "Creating account..." : "Create account"}

        {!isLoading && <ArrowRight size={18} strokeWidth={1.8} />}
      </button>

      {/* Login */}
      <p className="pt-2 text-center text-sm text-muted">
        Already have an account?{" "}
        <a
          href="/login"
          className="font-medium text-primary transition hover:text-primary-light"
        >
          Log in
        </a>
      </p>
    </form>
  );
};

export default RegisterForm;
