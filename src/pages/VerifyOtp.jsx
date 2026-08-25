import { useState } from "react";
import { ArrowRight } from "lucide-react";

const VerifyOtp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) {
      return;
    }

    const updatedOtp = [...otp];
    updatedOtp[index] = value;

    setOtp(updatedOtp);
    setError("");

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const code = otp.join("");

    if (code.length !== 6) {
      setError("Please enter the 6-digit verification code.");
      return;
    }

    setIsLoading(true);

    // Backend verification will be added later.
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("OTP:", code);

    setIsLoading(false);
  };

  return (
    <main className="min-h-screen bg-paper">
      <div className="flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-primary">
                <div className="h-3 w-3 rounded-full bg-primary" />
              </div>

              <span className="font-display text-2xl font-medium text-ink">
                FundMate
              </span>
            </div>
          </div>

          {/* Heading */}
          <div className="mt-12 text-center">
            <p className="text-sm font-medium text-muted">Email verification</p>

            <h1 className="mt-2 font-display text-4xl text-ink">
              Verify your email
            </h1>

            <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-muted">
              We sent a 6-digit verification code to your email address. Enter
              it below to continue.
            </p>
          </div>

          {/* OTP form */}
          <form onSubmit={handleSubmit} className="mt-10">
            <div className="flex justify-center gap-2 sm:gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(event) => handleChange(index, event.target.value)}
                  onKeyDown={(event) => handleKeyDown(index, event)}
                  className={`h-14 w-11 rounded-2xl border bg-white/60 text-center font-mono text-xl text-ink outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20 sm:h-16 sm:w-14 ${
                    error ? "border-danger-text" : "border-line"
                  }`}
                  aria-label={`Verification digit ${index + 1}`}
                />
              ))}
            </div>

            {error && (
              <p className="mt-4 text-center text-sm text-danger-text">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-medium text-white transition hover:bg-primary-light disabled:cursor-not-allowed disabled:bg-[#E4DFC9] disabled:text-placeholder"
            >
              {isLoading ? "Verifying..." : "Verify email"}

              {!isLoading && <ArrowRight size={18} strokeWidth={1.8} />}
            </button>
          </form>

          {/* Resend */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted">Didn't receive the code?</p>

            <button
              type="button"
              className="mt-2 text-sm font-medium text-primary transition hover:text-primary-light"
            >
              Resend code
            </button>
          </div>

          {/* Back */}
          <div className="mt-8 text-center">
            <a
              href="/register"
              className="text-sm font-medium text-muted transition hover:text-ink"
            >
              ← Back to registration
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default VerifyOtp;
