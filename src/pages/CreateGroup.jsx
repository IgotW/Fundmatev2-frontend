import { ArrowLeft, CalendarDays, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth.jsx";
import { createGroup } from "../api/auth.api.js";

const CreateGroup = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    contributionAmount: "",
    contributionFrequency: "monthly",
    paymentDays: "",
    gracePeriod: "",
    penaltyAmount: "",
    penaltyApplication: "once",
    penaltyBasis: "head",
    distributionDate: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Group name is required.";
    }

    if (
      !formData.contributionAmount ||
      Number(formData.contributionAmount) < 1
    ) {
      newErrors.contributionAmount = "Contribution amount must be at least ₱1.";
    }

    if (formData.contributionFrequency === "custom") {
      if (!formData.paymentDays.trim()) {
        newErrors.paymentDays = "Enter at least one payment day.";
      } else {
        const days = formData.paymentDays
          .split(",")
          .map((day) => Number(day.trim()));

        if (
          days.length === 0 ||
          days.some((day) => !Number.isInteger(day) || day < 1 || day > 31)
        ) {
          newErrors.paymentDays =
            "Payment days must be whole numbers from 1 to 31.";
        }
      }
    }

    if (Number(formData.gracePeriod) < 0) {
      newErrors.gracePeriod = "Grace period cannot be negative.";
    }

    if (Number(formData.penaltyAmount) < 0) {
      newErrors.penaltyAmount = "Penalty amount cannot be negative.";
    }

    if (!formData.distributionDate) {
      newErrors.distributionDate = "Distribution date is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSubmitError("");

    if (!validateForm()) {
      return;
    }

    if (!token) {
      setSubmitError("Your session has expired. Please log in again.");
      return;
    }

    const paymentDays =
      formData.contributionFrequency === "custom"
        ? formData.paymentDays
            .split(",")
            .map((day) => Number(day.trim()))
            .filter((day) => !Number.isNaN(day))
        : [];

    const payload = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      contributionAmount: Number(formData.contributionAmount),
      contributionFrequency: formData.contributionFrequency,
      paymentDays,
      gracePeriod: Number(formData.gracePeriod),
      penaltyAmount: Number(formData.penaltyAmount),
      penaltyApplication: formData.penaltyApplication,
      penaltyBasis: formData.penaltyBasis,
      distributionDate: formData.distributionDate,
    };

    try {
      setIsSubmitting(true);

      await createGroup(payload, token);

      navigate("/groups");
    } catch (error) {
      setSubmitError(error.message || "Failed to create group.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Back link */}
      <Link
        to="/groups"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-primary"
      >
        <ArrowLeft size={17} strokeWidth={1.8} />
        Back to My Groups
      </Link>

      {/* Page header */}
      <section className="mt-8">
        <p className="text-sm font-medium text-muted">Group management</p>

        <h1 className="mt-2 font-display text-3xl text-ink sm:text-4xl">
          Create a Group
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted sm:text-base">
          Set up a shared savings group and define how members will contribute
          and receive funds.
        </p>
      </section>

      {/* Form */}
      <section className="mt-10">
        <div className="rounded-2xl border border-line bg-white/60 p-6 sm:p-8">
          {/* Form heading */}
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Users size={21} strokeWidth={1.8} />
            </div>

            <div>
              <h2 className="font-display text-xl text-ink">Group details</h2>

              <p className="mt-1 text-sm leading-6 text-muted">
                Enter the information for your new savings group.
              </p>
            </div>
          </div>

          <form className="mt-8" onSubmit={handleSubmit}>
            {submitError && (
              <div className="mb-6 rounded-xl border border-[#E7C7C3] bg-[#FBECEC] px-4 py-3 text-sm text-[#9A3B32]">
                {submitError}
              </div>
            )}

            <div className="grid gap-8 lg:grid-cols-2">
              {/* LEFT COLUMN */}
              <div className="space-y-8">
                {/* Basic information */}
                <div>
                  <h3 className="font-display text-lg text-ink">
                    Basic information
                  </h3>

                  <div className="mt-5 space-y-5">
                    {/* Group name */}
                    <div>
                      <label
                        htmlFor="groupName"
                        className="block text-sm font-medium text-ink"
                      >
                        Group name
                      </label>

                      <input
                        id="groupName"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Sample Savings"
                        className="mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-placeholder focus:border-primary focus:ring-2 focus:ring-primary/10"
                      />
                      {errors.name && (
                        <p className="mt-2 text-xs text-[#9A3B32]">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Description */}
                    <div>
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-ink"
                      >
                        Description
                        <span className="ml-1 font-normal text-muted">
                          (optional)
                        </span>
                      </label>

                      <textarea
                        id="description"
                        name="description"
                        rows="5"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="e.g. Monthly savings group"
                        className="mt-2 w-full resize-none rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-placeholder focus:border-primary focus:ring-2 focus:ring-primary/10"
                      />
                    </div>
                  </div>
                </div>

                {/* Contribution settings */}
                <div className="border-t border-divider pt-8">
                  <h3 className="font-display text-lg text-ink">
                    Contribution settings
                  </h3>

                  <div className="mt-5 space-y-5">
                    {/* Contribution amount */}
                    <div>
                      <label
                        htmlFor="contributionAmount"
                        className="block text-sm font-medium text-ink"
                      >
                        Contribution amount
                      </label>

                      <input
                        id="contributionAmount"
                        name="contributionAmount"
                        type="number"
                        min="1"
                        step="0.01"
                        value={formData.contributionAmount}
                        onChange={handleChange}
                        placeholder="e.g. 500"
                        className="mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-placeholder focus:border-primary focus:ring-2 focus:ring-primary/10"
                      />
                      {errors.contributionAmount && (
                        <p className="mt-2 text-xs text-[#9A3B32]">
                          {errors.contributionAmount}
                        </p>
                      )}

                      <p className="mt-2 text-xs text-muted">
                        The amount each member contributes per payment cycle.
                      </p>
                    </div>

                    {/* Frequency */}
                    <div>
                      <label
                        htmlFor="frequency"
                        className="block text-sm font-medium text-ink"
                      >
                        Contribution frequency
                      </label>

                      <select
                        id="frequency"
                        name="contributionFrequency"
                        value={formData.contributionFrequency}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="custom">Custom</option>
                      </select>

                      {/* Automatic schedule */}
                      {formData.contributionFrequency !== "custom" && (
                        <div className="mt-3 rounded-xl border border-line bg-paper/60 px-4 py-3">
                          <p className="text-sm font-medium text-ink">
                            Payment schedule
                          </p>

                          <p className="mt-1 text-sm leading-5 text-muted">
                            {formData.contributionFrequency === "daily" &&
                              "Contributions are due every day."}

                            {formData.contributionFrequency === "weekly" &&
                              "Contributions are due every Sunday."}

                            {formData.contributionFrequency === "monthly" &&
                              "Contributions are due on the last day of each month."}
                          </p>
                        </div>
                      )}

                      {/* Custom payment days */}
                      {formData.contributionFrequency === "custom" && (
                        <div className="mt-5">
                          <label
                            htmlFor="paymentDays"
                            className="block text-sm font-medium text-ink"
                          >
                            Payment days
                          </label>

                          <input
                            id="paymentDays"
                            name="paymentDays"
                            type="text"
                            value={formData.paymentDays}
                            onChange={handleChange}
                            placeholder="e.g. 15, 30"
                            className="mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-placeholder focus:border-primary focus:ring-2 focus:ring-primary/10"
                          />
                          {errors.paymentDays && (
                            <p className="mt-2 text-xs text-[#9A3B32]">
                              {errors.paymentDays}
                            </p>
                          )}

                          <p className="mt-2 text-xs leading-5 text-muted">
                            Enter the days of the month when members should
                            contribute. Separate multiple days with commas.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="space-y-8">
                {/* Late payment settings */}
                <div>
                  <h3 className="font-display text-lg text-ink">
                    Late payment settings
                  </h3>

                  <div className="mt-5 space-y-5">
                    {/* Grace period */}
                    <div>
                      <label
                        htmlFor="gracePeriod"
                        className="block text-sm font-medium text-ink"
                      >
                        Grace period
                      </label>

                      <input
                        id="gracePeriod"
                        name="gracePeriod"
                        type="number"
                        min="0"
                        placeholder="e.g. 0"
                        value={formData.gracePeriod}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-placeholder focus:border-primary focus:ring-2 focus:ring-primary/10"
                      />
                      {errors.gracePeriod && (
                        <p className="mt-2 text-xs text-[#9A3B32]">
                          {errors.gracePeriod}
                        </p>
                      )}

                      <p className="mt-2 text-xs text-muted">
                        Number of days allowed after the due date before a
                        penalty applies.
                      </p>
                    </div>

                    {/* Penalty amount */}
                    <div>
                      <label
                        htmlFor="penaltyAmount"
                        className="block text-sm font-medium text-ink"
                      >
                        Penalty amount
                      </label>

                      <input
                        id="penaltyAmount"
                        name="penaltyAmount"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.penaltyAmount}
                        onChange={handleChange}
                        placeholder="e.g. 50"
                        className="mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-placeholder focus:border-primary focus:ring-2 focus:ring-primary/10"
                      />
                      {errors.penaltyAmount && (
                        <p className="mt-2 text-xs text-[#9A3B32]">
                          {errors.penaltyAmount}
                        </p>
                      )}

                      <p className="mt-2 text-xs text-muted">
                        Amount charged when a contribution becomes late.
                      </p>
                    </div>

                    {/* Penalty application */}
                    <div>
                      <label
                        htmlFor="penaltyApplication"
                        className="block text-sm font-medium text-ink"
                      >
                        Penalty application
                      </label>

                      <select
                        id="penaltyApplication"
                        name="penaltyApplication"
                        value={formData.penaltyApplication}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                      >
                        <option value="once">Apply once</option>
                        <option value="daily">Apply daily</option>
                      </select>

                      <p className="mt-2 text-xs text-muted">
                        Choose whether the penalty is charged once or repeatedly
                        for each late day.
                      </p>
                    </div>

                    {/* Penalty basis */}
                    <div>
                      <label
                        htmlFor="penaltyBasis"
                        className="block text-sm font-medium text-ink"
                      >
                        Penalty basis
                      </label>

                      <select
                        id="penaltyBasis"
                        name="penaltyBasis"
                        value={formData.penaltyBasis}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                      >
                        <option value="member">Per member</option>
                        <option value="head">Per head</option>
                      </select>

                      <p className="mt-2 text-xs text-muted">
                        Choose how the penalty amount is calculated.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Fund distribution */}
                <div className="border-t border-divider pt-8">
                  <div className="flex items-start gap-3">
                    <CalendarDays
                      size={20}
                      strokeWidth={1.8}
                      className="mt-0.5 shrink-0 text-primary"
                    />

                    <div>
                      <h3 className="font-display text-lg text-ink">
                        Fund distribution
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-muted">
                        Choose when the group fund is scheduled for
                        distribution.
                      </p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <label
                      htmlFor="distributionDate"
                      className="block text-sm font-medium text-ink"
                    >
                      Distribution date
                    </label>

                    <input
                      id="distributionDate"
                      name="distributionDate"
                      type="date"
                      value={formData.distributionDate}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                    />
                    {errors.distributionDate && (
                      <p className="mt-2 text-xs text-[#9A3B32]">
                        {errors.distributionDate}
                      </p>
                    )}

                    <p className="mt-2 text-xs leading-5 text-muted">
                      The date when the group fund is scheduled for
                      distribution.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-divider pt-6 sm:flex-row sm:justify-end">
              <Link
                to="/groups"
                className="inline-flex items-center justify-center rounded-full border border-line bg-white/60 px-5 py-3 text-sm font-medium text-ink transition hover:border-primary/30 hover:bg-white"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-white transition hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Creating Group..." : "Create Group"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default CreateGroup;
