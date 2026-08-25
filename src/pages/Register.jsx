import RegisterForm from "../components/auth/RegisterForm";

const Register = () => {
  return (
    <main className="min-h-screen bg-paper">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Branding */}
        <section className="hidden bg-primary lg:flex">
          <div className="flex w-full flex-col justify-between p-12">
            <div>
              <span className="font-display text-2xl text-white">FundMate</span>
            </div>

            <div className="max-w-lg">
              <p className="font-mono text-sm text-gold-soft">GROUP FINANCE</p>

              <h1 className="mt-5 font-display text-5xl leading-tight text-white">
                Start managing
                <br />
                together.
              </h1>

              <p className="mt-6 max-w-md leading-7 text-white/70">
                Create your FundMate account and bring your group's savings,
                contributions, and financial goals into one place.
              </p>
            </div>

            <p className="text-sm text-white/50">© 2026 FundMate</p>
          </div>
        </section>

        {/* Register */}
        <section className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <p className="text-sm font-medium text-muted">Get started</p>

            <h2 className="mt-2 font-display text-4xl text-ink">
              Create your account
            </h2>

            <p className="mt-3 text-sm leading-6 text-muted">
              Create an account to start managing your group's finances with
              FundMate.
            </p>

            <RegisterForm />
          </div>
        </section>
      </div>
    </main>
  );
};

export default Register;
