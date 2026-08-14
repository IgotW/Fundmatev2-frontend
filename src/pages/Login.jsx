import LoginForm from "../components/auth/LoginForm";

const Login = () => {
  return (
    <main className="min-h-screen bg-paper">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left side */}
        <section className="hidden bg-primary lg:flex">
          <div className="flex w-full flex-col justify-between p-12">
            <div>
              <span className="font-display text-2xl text-white">FundMate</span>
            </div>

            <div className="max-w-lg">
              <p className="font-mono text-sm text-gold-soft">GROUP FINANCE</p>

              <h1 className="mt-5 font-display text-5xl leading-tight text-white">
                Manage your money.
                <br />
                Grow together.
              </h1>

              <p className="mt-6 max-w-md leading-7 text-white/70">
                Keep contributions, savings, loans, and financial goals
                organized in one place.
              </p>
            </div>

            <p className="text-sm text-white/50">© 2026 FundMate</p>
          </div>
        </section>

        {/* Right side */}
        <section className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <p className="text-sm font-medium text-muted">Welcome back</p>

            <h2 className="mt-2 font-display text-4xl text-ink">
              Log in to FundMate
            </h2>

            <p className="mt-3 text-sm leading-6 text-muted">
              Enter your credentials to access your account.
            </p>
            <LoginForm />
          </div>
          s
        </section>
      </div>
    </main>
  );
};

export default Login;
