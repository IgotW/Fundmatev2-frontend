import { useEffect, useState } from "react";
import { ArrowLeft, X } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import {
  getContributionCycleSummary,
  recordPayment,
  generateMemberContributions,
} from "../api/auth.api.js";
import { useAuth } from "../hooks/useAuth.jsx";

const ContributionCycleDetails = () => {
  const { cycleId } = useParams();
  const { token } = useAuth();

  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedContribution, setSelectedContribution] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [paymentDate, setPaymentDate] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [paymentNotes, setPaymentNotes] = useState("");
  const [isSubmittingPayment, setIsSubmittingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState("");
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false);

  const [isGeneratingContributions, setIsGeneratingContributions] =
    useState(false);

  const [generationError, setGenerationError] = useState("");

  useEffect(() => {
    const fetchSummary = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        setError("");

        const response = await getContributionCycleSummary(cycleId, token);

        console.log("Contribution cycle summary:", response);

        setSummary(response.data);
      } catch (error) {
        console.error("Failed to fetch cycle summary:", error);
        setError(error.message || "Failed to load contribution cycle.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSummary();
  }, [cycleId, token]);

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-sm text-muted">Loading contribution cycle...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Link
          to={-1}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:text-primary-light"
        >
          <ArrowLeft size={17} strokeWidth={1.8} />
          Back to group
        </Link>

        <div className="mt-8 rounded-2xl border border-[#FBEAE8] bg-[#FBEAE8] p-5">
          <p className="text-sm font-medium text-[#B3463B]">{error}</p>
        </div>
      </div>
    );
  }

  if (!summary) {
    return null;
  }

  return (
    <div>
      <Link
        to={-1}
        className="inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:text-primary-light"
      >
        <ArrowLeft size={17} strokeWidth={1.8} />
        Back to group
      </Link>

      <section className="mt-8">
        <p className="text-sm font-medium text-muted">Contribution Cycle</p>

        <h1 className="mt-2 font-display text-3xl text-ink sm:text-4xl">
          Cycle Details
        </h1>

        <p className="mt-3 text-sm text-muted">
          View the contribution status and collection summary for this cycle.
        </p>
      </section>

      <section className="mt-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-line bg-white/60 p-5">
            <p className="text-sm text-muted">Total Expected</p>

            <p className="mt-2 font-mono text-2xl text-ink">
              ₱
              {Number(summary.summary?.totalExpected || 0).toLocaleString(
                "en-PH",
                {
                  minimumFractionDigits: 2,
                },
              )}
            </p>
          </div>

          <div className="rounded-2xl border border-line bg-white/60 p-5">
            <p className="text-sm text-muted">Total Collected</p>

            <p className="mt-2 font-mono text-2xl text-ink">
              ₱
              {Number(summary.summary?.totalCollected || 0).toLocaleString(
                "en-PH",
                {
                  minimumFractionDigits: 2,
                },
              )}
            </p>
          </div>

          <div className="rounded-2xl border border-line bg-white/60 p-5">
            <p className="text-sm text-muted">Collection Rate</p>

            <p className="mt-2 font-mono text-2xl text-ink">
              {summary.summary?.collectionPercentage || 0}%
            </p>
          </div>
        </div>
      </section>
      <section className="mt-6">
        <div className="rounded-2xl border border-line bg-white/60 p-6">
          <div>
            <p className="text-sm font-medium text-ink">Financial Summary</p>

            <p className="mt-1 text-xs text-muted">
              Breakdown of the amount expected, penalties, and collection.
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-muted">Expected contributions</span>

              <span className="font-mono text-sm text-ink">
                ₱
                {Number(summary.summary?.totalExpected || 0).toLocaleString(
                  "en-PH",
                  {
                    minimumFractionDigits: 2,
                  },
                )}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-muted">Penalties</span>

              <span className="font-mono text-sm text-ink">
                ₱
                {Number(summary.summary?.totalPenalties || 0).toLocaleString(
                  "en-PH",
                  {
                    minimumFractionDigits: 2,
                  },
                )}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-muted">Total amount due</span>

              <span className="font-mono text-sm font-medium text-ink">
                ₱
                {Number(summary.summary?.totalAmountDue || 0).toLocaleString(
                  "en-PH",
                  {
                    minimumFractionDigits: 2,
                  },
                )}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-muted">Outstanding balance</span>

              <span className="font-mono text-sm font-medium text-ink">
                ₱
                {Number(
                  summary.summary?.outstandingBalance || 0,
                ).toLocaleString("en-PH", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>
        </div>
      </section>
      {/* Payment Status */}
      <section className="mt-6">
        <div className="rounded-2xl border border-line bg-white/60 p-6">
          <div>
            <p className="text-sm font-medium text-ink">Payment Status</p>

            <p className="mt-1 text-xs text-muted">
              Current payment status for group members.
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-line bg-white/60 p-4">
              <p className="text-xs text-muted">Paid</p>

              <p className="mt-2 font-mono text-xl text-ink">
                {summary.summary?.paidCount || 0}
                <span className="ml-1 text-xs font-normal text-muted">
                  / {summary.summary?.totalMembers || 0}
                </span>
              </p>
            </div>

            <div className="rounded-xl border border-line bg-white/60 p-4">
              <p className="text-xs text-muted">Partial</p>

              <p className="mt-2 font-mono text-xl text-ink">
                {summary.summary?.partialCount || 0}
                <span className="ml-1 text-xs font-normal text-muted">
                  / {summary.summary?.totalMembers || 0}
                </span>
              </p>
            </div>

            <div className="rounded-xl border border-line bg-white/60 p-4">
              <p className="text-xs text-muted">Unpaid</p>

              <p className="mt-2 font-mono text-xl text-ink">
                {summary.summary?.unpaidCount || 0}
                <span className="ml-1 text-xs font-normal text-muted">
                  / {summary.summary?.totalMembers || 0}
                </span>
              </p>
            </div>

            <div className="rounded-xl border border-line bg-white/60 p-4">
              <p className="text-xs text-muted">Overdue</p>

              <p className="mt-2 font-mono text-xl text-ink">
                {summary.summary?.overdueCount || 0}
                <span className="ml-1 text-xs font-normal text-muted">
                  / {summary.summary?.totalMembers || 0}
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Member Contributions */}
      <section className="mt-6">
        <div className="rounded-2xl border border-line bg-white/60 p-6">
          <div>
            <p className="text-sm font-medium text-ink">Member Contributions</p>

            <p className="mt-1 text-xs text-muted">
              Individual contribution records for this cycle.
            </p>
          </div>

          <div className="mt-5 divide-y divide-divider">
            {!summary.contributions || summary.contributions.length === 0 ? (
              <div className="py-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-ink">
                    No member contributions found for this cycle.
                  </p>

                  <p className="mt-1 text-xs text-muted">
                    Generate contribution records for the active group members
                    to begin tracking payments.
                  </p>

                  {generationError && (
                    <div className="mx-auto mt-4 max-w-md rounded-xl border border-[#FBEAE8] bg-[#FBECEC] px-4 py-3 text-left">
                      <p className="text-sm text-[#9A3B32]">
                        {generationError}
                      </p>
                    </div>
                  )}

                  <button
                    type="button"
                    disabled={isGeneratingContributions}
                    onClick={async () => {
                      if (isGeneratingContributions) return;

                      try {
                        setIsGeneratingContributions(true);
                        setGenerationError("");

                        await generateMemberContributions(cycleId, token);

                        const response = await getContributionCycleSummary(
                          cycleId,
                          token,
                        );

                        setSummary(response.data);
                      } catch (error) {
                        setGenerationError(
                          error.message ||
                            "Failed to generate member contributions.",
                        );
                      } finally {
                        setIsGeneratingContributions(false);
                      }
                    }}
                    className="mt-5 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isGeneratingContributions
                      ? "Generating..."
                      : "Generate Member Contributions"}
                  </button>
                </div>
              </div>
            ) : (
              summary.contributions.map((contribution) => {
                const member = contribution.member;

                const fullName = member ? `${member.name}` : "Unknown member";

                const totalDue =
                  Number(contribution.amountDue || 0) +
                  Number(contribution.penaltyAmount || 0);

                const remainingBalance = Math.max(
                  totalDue - Number(contribution.amountPaid || 0),
                  0,
                );

                return (
                  <div
                    key={contribution._id}
                    className="py-5 first:pt-4 last:pb-0"
                  >
                    {/* Member */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-display text-sm font-medium text-white">
                          {member?.name
                            ? member.name.charAt(0).toUpperCase()
                            : "?"}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-ink">
                            {fullName}
                          </p>

                          <p className="truncate text-xs text-muted">
                            {member?.email || "No email available"}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium capitalize ${
                          contribution.status === "paid"
                            ? "bg-[#E7F0EA] text-[#2F6350]"
                            : contribution.status === "overdue"
                              ? "bg-[#FBEAE8] text-[#B3463B]"
                              : contribution.status === "partial"
                                ? "bg-[#F5EDD9] text-[#8C6D1F]"
                                : "bg-primary/10 text-primary"
                        }`}
                      >
                        {contribution.status}
                      </span>
                    </div>

                    {/* Contribution Details */}
                    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                      <div>
                        <p className="text-xs text-muted">Heads</p>

                        <p className="mt-1 font-mono text-sm text-ink">
                          {contribution.heads}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-muted">Contribution</p>

                        <p className="mt-1 font-mono text-sm text-ink">
                          ₱
                          {Number(contribution.amountDue || 0).toLocaleString(
                            "en-PH",
                            {
                              minimumFractionDigits: 2,
                            },
                          )}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-muted">Penalty</p>

                        <p className="mt-1 font-mono text-sm text-ink">
                          ₱
                          {Number(
                            contribution.penaltyAmount || 0,
                          ).toLocaleString("en-PH", {
                            minimumFractionDigits: 2,
                          })}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-muted">Paid</p>

                        <p className="mt-1 font-mono text-sm text-ink">
                          ₱
                          {Number(contribution.amountPaid || 0).toLocaleString(
                            "en-PH",
                            {
                              minimumFractionDigits: 2,
                            },
                          )}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-muted">Remaining</p>

                        <p
                          className={`mt-1 font-mono text-sm ${
                            remainingBalance > 0
                              ? "text-[#B3463B]"
                              : "text-[#2F6350]"
                          }`}
                        >
                          ₱
                          {remainingBalance.toLocaleString("en-PH", {
                            minimumFractionDigits: 2,
                          })}
                        </p>
                      </div>
                    </div>
                    {remainingBalance > 0 ? (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedContribution(contribution);
                          setPaymentError("");
                          setPaymentSuccess("");
                        }}
                        className="mt-4 w-full rounded-full border border-primary px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary hover:text-white"
                      >
                        Record Payment
                      </button>
                    ) : (
                      <div className="mt-4 flex w-full items-center justify-center rounded-full bg-[#E7F0EA] px-4 py-2 text-sm font-medium text-[#2F6350]">
                        Payment Complete
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
      {/* Cycle Information */}
      <section className="mt-8">
        <div className="rounded-2xl border border-line bg-white/60 p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted">
                Contribution Cycle
              </p>

              <p className="mt-2 font-display text-2xl text-ink">
                {new Intl.DateTimeFormat("en-PH", {
                  timeZone: "Asia/Manila",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                }).format(new Date(summary.cycle.dueDate))}
              </p>
            </div>

            <span
              className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-medium capitalize ${
                summary.cycle.status === "completed"
                  ? "bg-[#E7F0EA] text-[#2F6350]"
                  : summary.cycle.status === "cancelled"
                    ? "bg-[#FBEAE8] text-[#B3463B]"
                    : "bg-[#F5EDD9] text-[#8C6D1F]"
              }`}
            >
              {summary.cycle.status}
            </span>
          </div>

          <div className="mt-6 grid gap-4 border-t border-divider pt-5 sm:grid-cols-3">
            <div>
              <p className="text-xs text-muted">Contribution</p>

              <p className="mt-1 font-mono text-sm text-ink">
                ₱
                {Number(summary.cycle.contributionAmount || 0).toLocaleString(
                  "en-PH",
                  {
                    minimumFractionDigits: 2,
                  },
                )}
              </p>
            </div>

            <div>
              <p className="text-xs text-muted">Frequency</p>

              <p className="mt-1 text-sm capitalize text-ink">
                {summary.cycle.contributionFrequency}
              </p>
            </div>

            <div>
              <p className="text-xs text-muted">Grace Period</p>

              <p className="mt-1 text-sm text-ink">
                {summary.cycle.gracePeriod} day
                {summary.cycle.gracePeriod !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Collection Progress */}
      <section className="mt-6">
        <div className="rounded-2xl border border-line bg-white/60 p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-ink">
                Collection Progress
              </p>

              <p className="mt-1 text-xs text-muted">
                Amount collected for this contribution cycle.
              </p>
            </div>

            <span className="font-mono text-sm text-ink">
              {summary.summary?.collectionPercentage || 0}%
            </span>
          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-divider">
            <div
              className="h-full rounded-full bg-primary transition-all duration-700"
              style={{
                width: `${Math.min(
                  summary.summary?.collectionPercentage || 0,
                  100,
                )}%`,
              }}
            />
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-muted">
            <span>
              ₱
              {Number(summary.summary?.totalCollected || 0).toLocaleString(
                "en-PH",
                {
                  minimumFractionDigits: 2,
                },
              )}{" "}
              collected
            </span>

            <span>
              ₱
              {Number(summary.summary?.totalAmountDue || 0).toLocaleString(
                "en-PH",
                {
                  minimumFractionDigits: 2,
                },
              )}{" "}
              total due
            </span>
          </div>
        </div>
      </section>
      {selectedContribution && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4 py-6">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto fm-scrollbar rounded-2xl border border-line bg-white p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted">
                  Record Payment
                </p>

                <h2 className="mt-2 font-display text-2xl text-ink">
                  {selectedContribution.member?.firstName}{" "}
                  {selectedContribution.member?.lastName}
                </h2>

                <p className="mt-1 text-sm text-muted">
                  {selectedContribution.member?.email}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedContribution(null);
                  setPaymentAmount("");
                  setPaymentMethod("cash");
                  setPaymentDate("");
                  setReferenceNumber("");
                  setPaymentNotes("");
                  setPaymentError("");
                  setPaymentSuccess("");
                }}
                className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition hover:bg-sidebar-bg hover:text-ink"
              >
                <X size={18} strokeWidth={1.8} />
              </button>
            </div>

            <div className="mt-6 rounded-xl bg-sidebar-bg p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted">Remaining balance</span>

                <span className="font-mono font-medium text-ink">
                  ₱
                  {Math.max(
                    selectedContribution.amountDue +
                      selectedContribution.penaltyAmount -
                      selectedContribution.amountPaid,
                    0,
                  ).toLocaleString("en-PH", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <label className="text-sm font-medium text-ink">
                Payment Amount
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={paymentAmount}
                onChange={(event) => setPaymentAmount(event.target.value)}
                className="mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 font-mono text-sm text-ink outline-none transition focus:border-primary"
              />
              <div className="mt-5">
                <label className="text-sm font-medium text-ink">
                  Payment Method
                </label>

                <select
                  value={paymentMethod}
                  onChange={(event) => setPaymentMethod(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-primary"
                >
                  <option value="cash">Cash</option>
                  <option value="gcash">GCash</option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="mt-5">
                <label className="text-sm font-medium text-ink">
                  Payment Date
                </label>

                <input
                  type="date"
                  required
                  value={paymentDate}
                  onChange={(event) => setPaymentDate(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-primary"
                />
              </div>
              <div className="mt-5">
                <label className="text-sm font-medium text-ink">
                  Reference Number
                </label>

                <input
                  type="text"
                  value={referenceNumber}
                  onChange={(event) => setReferenceNumber(event.target.value)}
                  placeholder="Optional"
                  className="mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-primary"
                />

                <p className="mt-1 text-xs text-muted">
                  Useful for GCash or bank transfer payments.
                </p>
              </div>
              <div className="mt-5">
                <label className="text-sm font-medium text-ink">Notes</label>

                <textarea
                  value={paymentNotes}
                  onChange={(event) => setPaymentNotes(event.target.value)}
                  placeholder="Optional"
                  rows={3}
                  className="mt-2 w-full resize-none rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-primary"
                />
              </div>
            </div>

            {paymentSuccess && (
              <div className="mt-5 rounded-xl border border-[#E7F0EA] bg-[#E7F0EA] px-4 py-3">
                <p className="text-sm text-[#2F6350]">{paymentSuccess}</p>
              </div>
            )}

            {paymentError && (
              <div className="mt-5 rounded-xl border border-[#FBEAE8] bg-[#FBECEC] px-4 py-3">
                <p className="text-sm text-[#9A3B32]">{paymentError}</p>
              </div>
            )}
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedContribution(null);
                  setPaymentAmount("");
                  setPaymentMethod("cash");
                  setPaymentDate("");
                  setReferenceNumber("");
                  setPaymentNotes("");
                  setPaymentError("");
                  setPaymentSuccess("");
                }}
                className="flex-1 rounded-full border border-line px-4 py-3 text-sm font-medium text-ink transition hover:bg-sidebar-bg"
              >
                {paymentSuccess ? "Close" : "Cancel"}
              </button>

              <button
                type="button"
                disabled={isSubmittingPayment || !!paymentSuccess}
                onClick={async () => {
                  if (isSubmittingPayment) return;

                  try {
                    setIsSubmittingPayment(true);

                    const amount = Number(paymentAmount);

                    const remainingBalance = Math.max(
                      selectedContribution.amountDue +
                        selectedContribution.penaltyAmount -
                        selectedContribution.amountPaid,
                      0,
                    );

                    if (!paymentAmount || amount <= 0) {
                      setPaymentError("Please enter a valid payment amount.");
                      return;
                    }

                    if (!paymentDate) {
                      setPaymentError("Please select a payment date.");
                      return;
                    }

                    if (amount > remainingBalance) {
                      setPaymentError(
                        `Payment cannot exceed the remaining balance of ₱${remainingBalance.toLocaleString(
                          "en-PH",
                          {
                            minimumFractionDigits: 2,
                          },
                        )}.`,
                      );
                      return;
                    }

                    setShowPaymentConfirmation(true);
                    return;

                    await recordPayment(
                      selectedContribution._id,
                      {
                        amount,
                        paymentMethod,
                        paymentDate,
                        referenceNumber,
                        notes: paymentNotes,
                      },
                      token,
                    );

                    setSelectedContribution(null);
                    setPaymentAmount("");
                    setPaymentMethod("cash");
                    setPaymentDate("");
                    setReferenceNumber("");
                    setPaymentNotes("");
                    setPaymentSuccess("Payment recorded successfully.");

                    const response = await getContributionCycleSummary(
                      cycleId,
                      token,
                    );
                    setSummary(response.data);
                  } catch (error) {
                    setPaymentError(
                      error.message || "Failed to record payment.",
                    );
                  } finally {
                    setIsSubmittingPayment(false);
                  }
                }}
                className="flex-1 rounded-full bg-primary px-4 py-3 text-sm font-medium text-white transition hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmittingPayment
                  ? "Saving..."
                  : paymentSuccess
                    ? "Payment Recorded"
                    : "Save Payment"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Confirmation Modal */}
      {showPaymentConfirmation && selectedContribution && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/40 px-4">
          <div className="w-full max-w-md rounded-2xl border border-line bg-white p-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted">
                Confirm Payment
              </p>

              <h2 className="mt-2 font-display text-2xl text-ink">
                Confirm this payment?
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted">
                You are about to record a payment for{" "}
                <span className="font-medium text-ink">
                  {selectedContribution.member?.name || "this member"}
                </span>
                .
              </p>
            </div>

            <div className="mt-6 rounded-xl bg-sidebar-bg p-4">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-muted">Payment amount</span>

                <span className="font-mono text-lg font-medium text-ink">
                  ₱
                  {Number(paymentAmount).toLocaleString("en-PH", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between gap-4">
                <span className="text-sm text-muted">Payment method</span>

                <span className="text-sm capitalize text-ink">
                  {paymentMethod.replace("_", " ")}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between gap-4">
                <span className="text-sm text-muted">Payment date</span>

                <span className="text-sm text-ink">{paymentDate}</span>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setShowPaymentConfirmation(false)}
                className="flex-1 rounded-full border border-line px-4 py-3 text-sm font-medium text-ink transition hover:bg-sidebar-bg"
              >
                Go Back
              </button>

              <button
                type="button"
                disabled={isSubmittingPayment}
                onClick={async () => {
                  if (isSubmittingPayment) return;

                  try {
                    setIsSubmittingPayment(true);
                    setPaymentError("");

                    const amount = Number(paymentAmount);

                    await recordPayment(
                      selectedContribution._id,
                      {
                        amount,
                        paymentMethod,
                        paymentDate,
                        referenceNumber,
                        notes: paymentNotes,
                      },
                      token,
                    );

                    setShowPaymentConfirmation(false);

                    setPaymentAmount("");
                    setPaymentMethod("cash");
                    setPaymentDate("");
                    setReferenceNumber("");
                    setPaymentNotes("");

                    setPaymentSuccess("Payment recorded successfully.");

                    const response = await getContributionCycleSummary(
                      cycleId,
                      token,
                    );

                    setSummary(response.data);
                  } catch (error) {
                    setPaymentError(
                      error.message || "Failed to record payment.",
                    );
                    setShowPaymentConfirmation(false);
                  } finally {
                    setIsSubmittingPayment(false);
                  }
                }}
                className="flex-1 rounded-full bg-primary px-4 py-3 text-sm font-medium text-white transition hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmittingPayment ? "Saving..." : "Confirm Payment"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContributionCycleDetails;
